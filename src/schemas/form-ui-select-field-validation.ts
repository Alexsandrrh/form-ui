import z from "zod";

import {
  FormUIMaxLengthRule,
  FormUIMinLengthRule,
  FormUIRequiredRule,
} from "./form-ui-validation-rules";

export const FormUISelectFieldValidationSchema = z
  .object({
    required: FormUIRequiredRule,
    minLength: FormUIMinLengthRule,
    maxLength: FormUIMaxLengthRule,
  })
  .strict()
  .meta({
    id: "FormUISelectFieldValidationSchema",
    description: "Правила валидации для поля select.",
  });

export type FormUISelectFieldValidation = z.infer<
  typeof FormUISelectFieldValidationSchema
>;
