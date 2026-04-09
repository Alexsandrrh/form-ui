import { describe, expect, test } from "bun:test";

import { FormUISelectSyncFieldSchema } from "../form-ui-select-sync-field";

describe("FormUISelectSyncFieldSchema", () => {
  test("parses valid sync select", () => {
    const result = FormUISelectSyncFieldSchema.safeParse({
      type: "select",
      name: "priority",
      label: "Приоритет",
      placeholder: "Выберите приоритет",
      options: [
        { label: "Высокий", value: "high" },
        { label: "Низкий", value: "low" },
      ],
    });

    expect(result.success).toBe(true);
    if (!result.success) {
      throw new Error("Expected parse to succeed");
    }

    expect(result.data.multiple).toBe(false);
  });

  test("rejects sync select without options", () => {
    expect(
      FormUISelectSyncFieldSchema.safeParse({
        type: "select",
        name: "priority",
        label: "Приоритет",
        placeholder: "Выберите приоритет",
      }).success,
    ).toBe(false);
  });

  test("rejects sync select with invalid option shape", () => {
    expect(
      FormUISelectSyncFieldSchema.safeParse({
        type: "select",
        name: "priority",
        label: "Приоритет",
        placeholder: "Выберите приоритет",
        options: [{ label: "Высокий" }],
      }).success,
    ).toBe(false);
  });

  test("rejects unsupported validation keys for select", () => {
    expect(
      FormUISelectSyncFieldSchema.safeParse({
        type: "select",
        name: "priority",
        label: "Приоритет",
        placeholder: "Выберите приоритет",
        validation: {
          pattern: "^high$",
        },
        options: [{ label: "Высокий", value: "high" }],
      }).success,
    ).toBe(false);
  });
});
