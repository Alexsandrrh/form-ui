import { describe, expect, test } from "bun:test";

import { FormUIOptionsRefSchema } from "../form-ui-options-ref";

describe("FormUIOptionsRefSchema", () => {
  test("parses valid optionsRef", () => {
    const result = FormUIOptionsRefSchema.safeParse({
      method: "GET",
      endpoint: "/api/users",
      responseMap: {
        itemsPath: "data.items",
        valueField: "id",
        labelField: "name",
      },
    });

    expect(result.success).toBe(true);
  });

  test("rejects lowercase HTTP method", () => {
    expect(
      FormUIOptionsRefSchema.safeParse({
        method: "get",
        endpoint: "/api/users",
        responseMap: {
          itemsPath: null,
          valueField: "id",
          labelField: "name",
        },
      }).success,
    ).toBe(false);
  });

  test("rejects optionsRef without responseMap", () => {
    expect(
      FormUIOptionsRefSchema.safeParse({
        method: "GET",
        endpoint: "/api/users",
      }).success,
    ).toBe(false);
  });
});
