import z from "zod";

import { FormUIRequiredRule } from "./form-ui-validation-rules";

export const FormUISwitchFieldValidationSchema = z
  .object({
    required: FormUIRequiredRule,
  })
  .strict()
  .meta({
    id: "FormUISwitchFieldValidationSchema",
    description: "Правила валидации для поля switch.",
  });

export type FormUISwitchFieldValidation = z.infer<
  typeof FormUISwitchFieldValidationSchema
>;
