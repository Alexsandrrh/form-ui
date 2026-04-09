import z from "zod";

import {
  FormUIMaxLengthRule,
  FormUIMaxRule,
  FormUIMinLengthRule,
  FormUIMinRule,
  FormUIPatternRule,
  FormUIRequiredRule,
} from "./form-ui-validation-rules";

export const FormUIInputFieldValidationSchema = z
  .object({
    required: FormUIRequiredRule,
    minLength: FormUIMinLengthRule,
    maxLength: FormUIMaxLengthRule,
    min: FormUIMinRule,
    max: FormUIMaxRule,
    pattern: FormUIPatternRule,
  })
  .strict()
  .meta({
    id: "FormUIInputFieldValidationSchema",
    description: "Правила валидации для поля input.",
  });

export type FormUIInputFieldValidation = z.infer<
  typeof FormUIInputFieldValidationSchema
>;
