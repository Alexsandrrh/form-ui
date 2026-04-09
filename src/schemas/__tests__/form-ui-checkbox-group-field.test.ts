import { describe, expect, test } from "bun:test";

import { FormUICheckboxGroupFieldSchema } from "../form-ui-checkbox-group-field";

describe("FormUICheckboxGroupFieldSchema", () => {
  test("parses valid checkbox-group", () => {
    const result = FormUICheckboxGroupFieldSchema.safeParse({
      type: "checkbox-group",
      name: "channels",
      label: "Каналы",
      options: [
        { label: "Email", value: "email" },
        { label: "СЭД", value: "sed" },
      ],
    });

    expect(result.success).toBe(true);
  });

  test("rejects checkbox-group without options", () => {
    expect(
      FormUICheckboxGroupFieldSchema.safeParse({
        type: "checkbox-group",
        name: "channels",
        label: "Каналы",
      }).success,
    ).toBe(false);
  });

  test("rejects checkbox-group with invalid option", () => {
    expect(
      FormUICheckboxGroupFieldSchema.safeParse({
        type: "checkbox-group",
        name: "channels",
        label: "Каналы",
        options: [{ label: "Email" }],
      }).success,
    ).toBe(false);
  });

  test("allows group-length rules and rejects text pattern rule", () => {
    expect(
      FormUICheckboxGroupFieldSchema.safeParse({
        type: "checkbox-group",
        name: "channels",
        label: "Каналы",
        validation: {
          required: true,
          minLength: 1,
          maxLength: 2,
        },
        options: [{ label: "Email", value: "email" }],
      }).success,
    ).toBe(true);

    expect(
      FormUICheckboxGroupFieldSchema.safeParse({
        type: "checkbox-group",
        name: "channels",
        label: "Каналы",
        validation: {
          pattern: "^email$",
        },
        options: [{ label: "Email", value: "email" }],
      }).success,
    ).toBe(false);
  });
});
