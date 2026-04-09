import { describe, expect, test } from "bun:test";

import { FormUIInputFieldSchema } from "../form-ui-input-field";

describe("FormUIInputFieldSchema", () => {
  test("uses default inputType=text", () => {
    const result = FormUIInputFieldSchema.safeParse({
      type: "input",
      name: "title",
      label: "Заголовок",
      placeholder: "Введите заголовок",
    });

    expect(result.success).toBe(true);
    if (!result.success) {
      throw new Error("Expected parse to succeed");
    }

    expect(result.data.inputType).toBe("text");
  });

  test("rejects input without placeholder", () => {
    expect(
      FormUIInputFieldSchema.safeParse({
        type: "input",
        name: "title",
        label: "Заголовок",
      }).success,
    ).toBe(false);
  });

  test("rejects unsupported inputType", () => {
    expect(
      FormUIInputFieldSchema.safeParse({
        type: "input",
        name: "title",
        label: "Заголовок",
        placeholder: "Введите заголовок",
        inputType: "date",
      }).success,
    ).toBe(false);
  });

  test("rejects unsupported validation keys for input", () => {
    expect(
      FormUIInputFieldSchema.safeParse({
        type: "input",
        name: "title",
        label: "Заголовок",
        placeholder: "Введите заголовок",
        validation: {
          checked: true,
        },
      }).success,
    ).toBe(false);
  });
});
