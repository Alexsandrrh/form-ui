import z from "zod";

import { FormUIBaseFieldSchema } from "./form-ui-base-field";
import { FormUIOptionSchema } from "./form-ui-option";
import { FormUICheckboxGroupFieldValidationSchema } from "./form-ui-checkbox-group-field-validation";

export const FormUICheckboxGroupFieldSchema = FormUIBaseFieldSchema.extend({
  type: z.literal("checkbox-group").meta({
    description: "Дискриминатор группы флажков.",
  }),
  validation: FormUICheckboxGroupFieldValidationSchema.optional().meta({
    description: "Правила валидации для поля checkbox-group.",
  }),
  options: FormUIOptionSchema.array().meta({
    description: "Набор вариантов для выбора нескольких значений.",
  }),
}).meta({
  id: "FormUICheckboxGroupFieldSchema",
  description: "Схема поля checkbox-group.",
});

export type FormUICheckboxGroupField = z.infer<typeof FormUICheckboxGroupFieldSchema>;
