import z from "zod";

import { FormUIBaseFieldSchema } from "./form-ui-base-field";

export const FormUICheckboxFieldSchema = FormUIBaseFieldSchema.extend({
  type: z.literal("checkbox").meta({
    description: "Дискриминатор поля-флажка.",
  }),
  checked: z.boolean().default(false).meta({
    description: "Начальное состояние флажка.",
  }),
}).meta({
  id: "FormUICheckboxFieldSchema",
  description: "Схема поля checkbox.",
});

export type FormUICheckboxField = z.infer<typeof FormUICheckboxFieldSchema>;
