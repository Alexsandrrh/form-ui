import z from "zod";

import { FormUIBaseFieldSchema } from "./form-ui-base-field";

export const FormUISwitchFieldSchema = FormUIBaseFieldSchema.extend({
  type: z.literal("switch").meta({
    description: "Дискриминатор поля-переключателя.",
  }),
  checked: z.boolean().default(false).meta({
    description: "Начальное состояние переключателя.",
  }),
}).meta({
  id: "FormUISwitchFieldSchema",
  description: "Схема поля switch.",
});

export type FormUISwitchField = z.infer<typeof FormUISwitchFieldSchema>;
