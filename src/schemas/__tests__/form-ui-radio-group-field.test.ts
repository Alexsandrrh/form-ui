import { describe, expect, test } from "bun:test";

import { FormUIRadioGroupFieldSchema } from "../form-ui-radio-group-field";

describe("FormUIRadioGroupFieldSchema", () => {
  test("parses valid radio-group", () => {
    const result = FormUIRadioGroupFieldSchema.safeParse({
      type: "radio-group",
      name: "state",
      label: "Статус",
      options: [
        { label: "Черновик", value: "draft" },
        { label: "Подписан", value: "signed" },
      ],
    });

    expect(result.success).toBe(true);
  });

  test("rejects radio-group without options", () => {
    expect(
      FormUIRadioGroupFieldSchema.safeParse({
        type: "radio-group",
        name: "state",
        label: "Статус",
      }).success,
    ).toBe(false);
  });

  test("rejects radio-group with invalid option", () => {
    expect(
      FormUIRadioGroupFieldSchema.safeParse({
        type: "radio-group",
        name: "state",
        label: "Статус",
        options: [{ value: "draft" }],
      }).success,
    ).toBe(false);
  });

  test("rejects unsupported validation keys for radio-group", () => {
    expect(
      FormUIRadioGroupFieldSchema.safeParse({
        type: "radio-group",
        name: "state",
        label: "Статус",
        validation: {
          maxLength: 1,
        },
        options: [{ label: "Черновик", value: "draft" }],
      }).success,
    ).toBe(false);
  });
});
