import { describe, expect, test } from "bun:test";

import { FormUISelectFieldSchema } from "../form-ui-select-field";

describe("FormUISelectFieldSchema", () => {
  test("accepts sync select variant", () => {
    const result = FormUISelectFieldSchema.safeParse({
      type: "select",
      name: "priority",
      label: "Приоритет",
      placeholder: "Выберите приоритет",
      options: [{ label: "Высокий", value: "high" }],
    });

    expect(result.success).toBe(true);
  });

  test("accepts async select variant", () => {
    const result = FormUISelectFieldSchema.safeParse({
      type: "select",
      name: "employee",
      label: "Сотрудник",
      placeholder: "Выберите сотрудника",
      optionsRef: {
        method: "GET",
        endpoint: "/api/employees",
        responseMap: {
          itemsPath: null,
          valueField: "id",
          labelField: "name",
        },
      },
    });

    expect(result.success).toBe(true);
  });

  test("rejects select without options and optionsRef", () => {
    expect(
      FormUISelectFieldSchema.safeParse({
        type: "select",
        name: "employee",
        label: "Сотрудник",
        placeholder: "Выберите сотрудника",
      }).success,
    ).toBe(false);
  });
});
