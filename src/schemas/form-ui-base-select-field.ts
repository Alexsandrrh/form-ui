import z from "zod";

import { FormUIBaseFieldSchema } from "./form-ui-base-field";

export const FormUIBaseSelectFieldSchema = FormUIBaseFieldSchema.extend({
  type: z.literal("select").meta({
    description: "Дискриминатор поля выбора.",
  }),
  placeholder: z.string().meta({
    description: "Подсказка, когда значение не выбрано.",
  }),
  multiple: z.boolean().default(false).meta({
    description: "Разрешает выбор нескольких значений.",
  }),
}).meta({
  id: "FormUIBaseSelectFieldSchema",
  description: "Базовая схема полей выбора (select).",
});

export type FormUIBaseSelectField = z.infer<typeof FormUIBaseSelectFieldSchema>;
