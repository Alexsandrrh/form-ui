import { describe, expect, test } from "bun:test";

import { FormUIValidation } from "../index";
import { FormUICheckboxFieldValidationSchema } from "../form-ui-checkbox-field-validation";
import { FormUICheckboxGroupFieldValidationSchema } from "../form-ui-checkbox-group-field-validation";
import { FormUIInputFieldValidationSchema } from "../form-ui-input-field-validation";
import { FormUIRadioGroupFieldValidationSchema } from "../form-ui-radio-group-field-validation";
import { FormUISelectFieldValidationSchema } from "../form-ui-select-field-validation";
import { FormUISwitchFieldValidationSchema } from "../form-ui-switch-field-validation";

describe("FormUIInputFieldValidationSchema", () => {
  test("parses valid input validation rules", () => {
    const result = FormUIInputFieldValidationSchema.safeParse({
      required: true,
      minLength: 1,
      maxLength: 10,
      min: 0,
      max: 100,
      pattern: "^[A-Z]+$",
    });

    expect(result.success).toBe(true);
  });

  test("rejects non-integer and negative length constraints", () => {
    expect(FormUIInputFieldValidationSchema.safeParse({ minLength: 1.5 }).success).toBe(
      false,
    );
    expect(FormUIInputFieldValidationSchema.safeParse({ maxLength: -1 }).success).toBe(
      false,
    );
  });

  test("rejects empty pattern and unknown keys", () => {
    expect(FormUIInputFieldValidationSchema.safeParse({ pattern: "" }).success).toBe(
      false,
    );
    expect(FormUIInputFieldValidationSchema.safeParse({ checked: true }).success).toBe(
      false,
    );
  });
});

describe("Field-specific validation schemas", () => {
  test("select allows only required/minLength/maxLength", () => {
    expect(
      FormUISelectFieldValidationSchema.safeParse({
        required: true,
        minLength: 1,
        maxLength: 5,
      }).success,
    ).toBe(true);
    expect(FormUISelectFieldValidationSchema.safeParse({ pattern: "^A" }).success).toBe(
      false,
    );
  });

  test("checkbox and switch allow only required", () => {
    expect(FormUICheckboxFieldValidationSchema.safeParse({ required: true }).success).toBe(
      true,
    );
    expect(FormUISwitchFieldValidationSchema.safeParse({ required: false }).success).toBe(
      true,
    );

    expect(FormUICheckboxFieldValidationSchema.safeParse({ minLength: 1 }).success).toBe(
      false,
    );
    expect(FormUISwitchFieldValidationSchema.safeParse({ minLength: 1 }).success).toBe(
      false,
    );
  });

  test("radio-group allows only required", () => {
    expect(FormUIRadioGroupFieldValidationSchema.safeParse({ required: true }).success).toBe(
      true,
    );
    expect(FormUIRadioGroupFieldValidationSchema.safeParse({ maxLength: 1 }).success).toBe(
      false,
    );
  });

  test("checkbox-group allows required/minLength/maxLength only", () => {
    expect(
      FormUICheckboxGroupFieldValidationSchema.safeParse({
        required: true,
        minLength: 1,
        maxLength: 3,
      }).success,
    ).toBe(true);
    expect(
      FormUICheckboxGroupFieldValidationSchema.safeParse({ pattern: "^email$" }).success,
    ).toBe(false);
  });
});

describe("FormUIValidation alias", () => {
  test("matches input validation behavior", () => {
    expect(
      FormUIValidation.safeParse({
        required: true,
        pattern: "^\\w+$",
      }).success,
    ).toBe(true);
    expect(FormUIValidation.safeParse({ checked: true }).success).toBe(false);
  });
});
