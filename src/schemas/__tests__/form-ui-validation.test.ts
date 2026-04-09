import { describe, expect, test } from "bun:test";

import { FormUIValidation } from "../form-ui-validation";

describe("FormUIValidation", () => {
  test("parses valid validation object", () => {
    const result = FormUIValidation.safeParse({
      required: true,
      minLength: 1,
      maxLength: 10,
      min: 0,
      max: 100,
      pattern: "^[A-Z]+$",
    });

    expect(result.success).toBe(true);
  });

  test("rejects non-integer and negative length constraints", () => {
    expect(FormUIValidation.safeParse({ minLength: 1.5 }).success).toBe(false);
    expect(FormUIValidation.safeParse({ maxLength: -1 }).success).toBe(false);
  });

  test("rejects empty pattern", () => {
    expect(FormUIValidation.safeParse({ pattern: "" }).success).toBe(false);
  });
});
