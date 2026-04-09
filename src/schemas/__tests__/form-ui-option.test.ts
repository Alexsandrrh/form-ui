import { describe, expect, test } from "bun:test";

import { FormUIOptionSchema } from "../form-ui-option";

describe("FormUIOptionSchema", () => {
  test("parses valid option", () => {
    const result = FormUIOptionSchema.safeParse({
      label: "Черновик",
      value: "draft",
    });

    expect(result.success).toBe(true);
  });

  test("rejects option without value", () => {
    expect(
      FormUIOptionSchema.safeParse({
        label: "Черновик",
      }).success,
    ).toBe(false);
  });
});
