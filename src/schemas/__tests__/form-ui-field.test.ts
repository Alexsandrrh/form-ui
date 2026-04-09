import { describe, expect, test } from "bun:test";

import { FormUIFieldSchema } from "../form-ui-field";

describe("FormUIFieldSchema", () => {
  test("accepts all supported field variants", () => {
    const payloads = [
      {
        type: "input",
        name: "title",
        label: "Заголовок",
        placeholder: "Введите заголовок",
      },
      {
        type: "select",
        name: "priority",
        label: "Приоритет",
        placeholder: "Выберите приоритет",
        options: [{ label: "Высокий", value: "high" }],
      },
      {
        type: "checkbox",
        name: "hasAttachment",
        label: "Только с вложениями",
      },
      {
        type: "switch",
        name: "isArchived",
        label: "Показывать архивные",
      },
      {
        type: "radio-group",
        name: "state",
        label: "Статус",
        options: [{ label: "Черновик", value: "draft" }],
      },
      {
        type: "checkbox-group",
        name: "channels",
        label: "Каналы",
        options: [{ label: "Email", value: "email" }],
      },
    ];

    for (const payload of payloads) {
      expect(FormUIFieldSchema.safeParse(payload).success).toBe(true);
    }
  });

  test("rejects unknown type", () => {
    expect(
      FormUIFieldSchema.safeParse({
        type: "textarea",
        name: "title",
        label: "Заголовок",
      }).success,
    ).toBe(false);
  });

  test("rejects invalid shape for known type", () => {
    expect(
      FormUIFieldSchema.safeParse({
        type: "input",
        name: "title",
        label: "Заголовок",
      }).success,
    ).toBe(false);
  });

  test("rejects invalid validation rules for known type", () => {
    expect(
      FormUIFieldSchema.safeParse({
        type: "switch",
        name: "isArchived",
        label: "Показывать архивные",
        validation: {
          minLength: 1,
        },
      }).success,
    ).toBe(false);
  });
});
