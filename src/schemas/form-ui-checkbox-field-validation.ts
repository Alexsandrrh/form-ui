import z from "zod";

import { FormUIRequiredRule } from "./form-ui-validation-rules";

export const FormUICheckboxFieldValidationSchema = z
  .object({
    required: FormUIRequiredRule,
  })
  .strict()
  .meta({
    id: "FormUICheckboxFieldValidationSchema",
    description: "Правила валидации для поля checkbox.",
  });

export type FormUICheckboxFieldValidation = z.infer<
  typeof FormUICheckboxFieldValidationSchema
>;
