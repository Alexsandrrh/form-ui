import z from "zod";

import { FormUIBaseFieldSchema } from "./form-ui-base-field";
import { FormUICheckboxFieldValidationSchema } from "./form-ui-checkbox-field-validation";

export const FormUICheckboxFieldSchema = FormUIBaseFieldSchema.extend({
  type: z.literal("checkbox").meta({
    description: "Дискриминатор поля-флажка.",
  }),
  validation: FormUICheckboxFieldValidationSchema.optional().meta({
    description: "Правила валидации для поля checkbox.",
  }),
  checked: z.boolean().default(false).meta({
    description: "Начальное состояние флажка.",
  }),
}).meta({
  id: "FormUICheckboxFieldSchema",
  description: "Схема поля checkbox.",
});

export type FormUICheckboxField = z.infer<typeof FormUICheckboxFieldSchema>;
