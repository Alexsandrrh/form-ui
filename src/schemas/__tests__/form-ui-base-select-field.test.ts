import { describe, expect, test } from "bun:test";

import { FormUIBaseSelectFieldSchema } from "../form-ui-base-select-field";

describe("FormUIBaseSelectFieldSchema", () => {
  test("uses default multiple=false", () => {
    const result = FormUIBaseSelectFieldSchema.safeParse({
      type: "select",
      name: "department",
      label: "Подразделение",
      placeholder: "Выберите подразделение",
    });

    expect(result.success).toBe(true);
    if (!result.success) {
      throw new Error("Expected parse to succeed");
    }

    expect(result.data.multiple).toBe(false);
  });

  test("rejects base select without placeholder", () => {
    expect(
      FormUIBaseSelectFieldSchema.safeParse({
        type: "select",
        name: "department",
        label: "Подразделение",
      }).success,
    ).toBe(false);
  });

  test("rejects unknown type", () => {
    expect(
      FormUIBaseSelectFieldSchema.safeParse({
        type: "input",
        name: "department",
        label: "Подразделение",
        placeholder: "Выберите подразделение",
      }).success,
    ).toBe(false);
  });

  test("allows only select-specific validation keys", () => {
    expect(
      FormUIBaseSelectFieldSchema.safeParse({
        type: "select",
        name: "department",
        label: "Подразделение",
        placeholder: "Выберите подразделение",
        validation: {
          required: true,
          minLength: 1,
          maxLength: 3,
        },
      }).success,
    ).toBe(true);

    expect(
      FormUIBaseSelectFieldSchema.safeParse({
        type: "select",
        name: "department",
        label: "Подразделение",
        placeholder: "Выберите подразделение",
        validation: {
          pattern: "^dep",
        },
      }).success,
    ).toBe(false);
  });
});
