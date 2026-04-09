import z from "zod";

import { FormUIBaseFieldSchema } from "./form-ui-base-field";
import { FormUIOptionSchema } from "./form-ui-option";

export const FormUICheckboxGroupFieldSchema = FormUIBaseFieldSchema.extend({
  type: z.literal("checkbox-group").meta({
    description: "Дискриминатор группы флажков.",
  }),
  options: FormUIOptionSchema.array().meta({
    description: "Набор вариантов для выбора нескольких значений.",
  }),
}).meta({
  id: "FormUICheckboxGroupFieldSchema",
  description: "Схема поля checkbox-group.",
});

export type FormUICheckboxGroupField = z.infer<typeof FormUICheckboxGroupFieldSchema>;
