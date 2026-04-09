import { describe, expect, test } from "bun:test";

import { FormUICheckboxFieldSchema } from "../form-ui-checkbox-field";

describe("FormUICheckboxFieldSchema", () => {
  test("uses default checked=false", () => {
    const result = FormUICheckboxFieldSchema.safeParse({
      type: "checkbox",
      name: "hasAttachment",
      label: "Только с вложениями",
    });

    expect(result.success).toBe(true);
    if (!result.success) {
      throw new Error("Expected parse to succeed");
    }

    expect(result.data.checked).toBe(false);
  });

  test("parses explicit checked=true", () => {
    const result = FormUICheckboxFieldSchema.safeParse({
      type: "checkbox",
      name: "hasAttachment",
      label: "Только с вложениями",
      checked: true,
    });

    expect(result.success).toBe(true);
  });

  test("rejects non-boolean checked", () => {
    expect(
      FormUICheckboxFieldSchema.safeParse({
        type: "checkbox",
        name: "hasAttachment",
        label: "Только с вложениями",
        checked: "yes",
      }).success,
    ).toBe(false);
  });
});
