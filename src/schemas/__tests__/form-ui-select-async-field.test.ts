import { describe, expect, test } from "bun:test";

import { FormUISelectAsyncFieldSchema } from "../form-ui-select-async-field";

describe("FormUISelectAsyncFieldSchema", () => {
  test("parses valid async select", () => {
    const result = FormUISelectAsyncFieldSchema.safeParse({
      type: "select",
      name: "employee",
      label: "Сотрудник",
      placeholder: "Выберите сотрудника",
      optionsRef: {
        method: "GET",
        endpoint: "/api/employees",
        responseMap: {
          itemsPath: "data.items",
          valueField: "id",
          labelField: "name",
        },
      },
    });

    expect(result.success).toBe(true);
    if (!result.success) {
      throw new Error("Expected parse to succeed");
    }

    expect(result.data.multiple).toBe(false);
  });

  test("rejects async select without optionsRef", () => {
    expect(
      FormUISelectAsyncFieldSchema.safeParse({
        type: "select",
        name: "employee",
        label: "Сотрудник",
        placeholder: "Выберите сотрудника",
      }).success,
    ).toBe(false);
  });

  test("rejects async select with lowercase method", () => {
    expect(
      FormUISelectAsyncFieldSchema.safeParse({
        type: "select",
        name: "employee",
        label: "Сотрудник",
        placeholder: "Выберите сотрудника",
        optionsRef: {
          method: "get",
          endpoint: "/api/employees",
          responseMap: {
            itemsPath: null,
            valueField: "id",
            labelField: "name",
          },
        },
      }).success,
    ).toBe(false);
  });

  test("rejects unsupported validation keys for async select", () => {
    expect(
      FormUISelectAsyncFieldSchema.safeParse({
        type: "select",
        name: "employee",
        label: "Сотрудник",
        placeholder: "Выберите сотрудника",
        validation: {
          pattern: "^A",
        },
        optionsRef: {
          method: "GET",
          endpoint: "/api/employees",
          responseMap: {
            itemsPath: null,
            valueField: "id",
            labelField: "name",
          },
        },
      }).success,
    ).toBe(false);
  });
});
