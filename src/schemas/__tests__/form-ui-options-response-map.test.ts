import { describe, expect, test } from "bun:test";

import { FormUIOptionsResponseMapSchema } from "../form-ui-options-response-map";

describe("FormUIOptionsResponseMapSchema", () => {
  test("parses map with null itemsPath", () => {
    const result = FormUIOptionsResponseMapSchema.safeParse({
      itemsPath: null,
      valueField: "id",
      labelField: "name",
    });

    expect(result.success).toBe(true);
  });

  test("parses map with string itemsPath", () => {
    const result = FormUIOptionsResponseMapSchema.safeParse({
      itemsPath: "data.items",
      valueField: "id",
      labelField: "name",
    });

    expect(result.success).toBe(true);
  });

  test("rejects map without labelField", () => {
    expect(
      FormUIOptionsResponseMapSchema.safeParse({
        itemsPath: null,
        valueField: "id",
      }).success,
    ).toBe(false);
  });
});
