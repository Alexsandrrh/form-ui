import z from "zod";

import { FormUIBaseFieldSchema } from "./form-ui-base-field";
import { FormUIOptionSchema } from "./form-ui-option";

export const FormUIRadioGroupFieldSchema = FormUIBaseFieldSchema.extend({
  type: z.literal("radio-group").meta({
    description: "Дискриминатор группы радиокнопок.",
  }),
  options: FormUIOptionSchema.array().meta({
    description: "Набор вариантов для выбора одного значения.",
  }),
}).meta({
  id: "FormUIRadioGroupFieldSchema",
  description: "Схема поля radio-group.",
});

export type FormUIRadioGroupField = z.infer<typeof FormUIRadioGroupFieldSchema>;
