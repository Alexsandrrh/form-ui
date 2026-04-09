import z from "zod";

import { FormUIBaseFieldSchema } from "./form-ui-base-field";
import { FormUIInputFieldValidationSchema } from "./form-ui-input-field-validation";

export const FormUIInputFieldSchema = FormUIBaseFieldSchema.extend({
  type: z.literal("input").meta({
    description: "Дискриминатор поля ввода.",
  }),
  placeholder: z.string().meta({
    description: "Подсказка, когда значение поля не заполнено.",
  }),
  validation: FormUIInputFieldValidationSchema.optional().meta({
    description: "Правила валидации для поля ввода.",
  }),
  inputType: z
    .enum(["text", "email", "number", "password", "tel", "url", "search"])
    .default("text")
    .meta({
      description: "Тип HTML input для рендера и базовой валидации.",
    }),
}).meta({
  id: "FormUIInputFieldSchema",
  description: "Схема текстовых полей ввода.",
});

export type FormUIInputField = z.infer<typeof FormUIInputFieldSchema>;
