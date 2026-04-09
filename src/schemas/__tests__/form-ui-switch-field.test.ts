import { describe, expect, test } from "bun:test";

import { FormUISwitchFieldSchema } from "../form-ui-switch-field";

describe("FormUISwitchFieldSchema", () => {
  test("uses default checked=false", () => {
    const result = FormUISwitchFieldSchema.safeParse({
      type: "switch",
      name: "isArchived",
      label: "Показывать архивные",
    });

    expect(result.success).toBe(true);
    if (!result.success) {
      throw new Error("Expected parse to succeed");
    }

    expect(result.data.checked).toBe(false);
  });

  test("parses explicit checked=true", () => {
    const result = FormUISwitchFieldSchema.safeParse({
      type: "switch",
      name: "isArchived",
      label: "Показывать архивные",
      checked: true,
    });

    expect(result.success).toBe(true);
  });

  test("rejects non-boolean checked", () => {
    expect(
      FormUISwitchFieldSchema.safeParse({
        type: "switch",
        name: "isArchived",
        label: "Показывать архивные",
        checked: "yes",
      }).success,
    ).toBe(false);
  });

  test("rejects unsupported validation keys for switch", () => {
    expect(
      FormUISwitchFieldSchema.safeParse({
        type: "switch",
        name: "isArchived",
        label: "Показывать архивные",
        validation: {
          minLength: 1,
        },
      }).success,
    ).toBe(false);
  });
});
