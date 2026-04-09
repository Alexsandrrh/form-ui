import { describe, expect, test } from "bun:test";

import { FormUIFieldSchema } from "./index";

describe("FormUIFieldSchema", () => {
  test("parses input fields", () => {
    const field = FormUIFieldSchema.parse({
      type: "input",
      name: "email",
      label: "Email",
      placeholder: "Enter your email",
      inputType: "email",
    });

    expect(field.type).toBe("input");
  });

  test("parses sync select fields", () => {
    const field = FormUIFieldSchema.parse({
      type: "select",
      name: "country",
      label: "Country",
      placeholder: "Choose a country",
      options: [
        { label: "USA", value: "us" },
        { label: "Canada", value: "ca" },
      ],
    });

    if (field.type !== "select") {
      throw new Error("Expected select field");
    }

    expect("options" in field).toBe(true);
    expect(field.multiple).toBe(false);
  });

  test("parses async select fields", () => {
    const field = FormUIFieldSchema.parse({
      type: "select",
      name: "assignee",
      label: "Assignee",
      placeholder: "Choose an assignee",
      multiple: true,
      optionsRef: {
        method: "GET",
        endpoint: "/api/users",
        responseMap: {
          itemsPath: "items",
          valueField: "id",
          labelField: "name",
        },
      },
    });

    if (field.type !== "select") {
      throw new Error("Expected select field");
    }

    expect("optionsRef" in field).toBe(true);
    expect(field.multiple).toBe(true);
  });

  test("parses checkbox fields", () => {
    const field = FormUIFieldSchema.parse({
      type: "checkbox",
      name: "agree",
      label: "Согласие",
    });

    if (field.type !== "checkbox") {
      throw new Error("Expected checkbox field");
    }

    expect(field.checked).toBe(false);
  });

  test("parses switch fields", () => {
    const field = FormUIFieldSchema.parse({
      type: "switch",
      name: "isEnabled",
      label: "Активно",
      checked: true,
    });

    if (field.type !== "switch") {
      throw new Error("Expected switch field");
    }

    expect(field.checked).toBe(true);
  });
});
