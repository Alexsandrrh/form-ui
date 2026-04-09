import { describe, expect, test } from "bun:test";

import { FormUIBaseFieldSchema } from "../form-ui-base-field";

describe("FormUIBaseFieldSchema", () => {
  test("parses valid base field", () => {
    const result = FormUIBaseFieldSchema.safeParse({
      name: "title",
      label: "Заголовок",
      validation: { required: true },
    });

    expect(result.success).toBe(true);
  });

  test("rejects field without name", () => {
    expect(
      FormUIBaseFieldSchema.safeParse({
        label: "Заголовок",
      }).success,
    ).toBe(false);
  });

  test("rejects field without label", () => {
    expect(
      FormUIBaseFieldSchema.safeParse({
        name: "title",
      }).success,
    ).toBe(false);
  });
});
