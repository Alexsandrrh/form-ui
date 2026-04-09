import z from "zod";

import {
  FormUIMaxLengthRule,
  FormUIMinLengthRule,
  FormUIRequiredRule,
} from "./form-ui-validation-rules";

export const FormUICheckboxGroupFieldValidationSchema = z
  .object({
    required: FormUIRequiredRule,
    minLength: FormUIMinLengthRule,
    maxLength: FormUIMaxLengthRule,
  })
  .strict()
  .meta({
    id: "FormUICheckboxGroupFieldValidationSchema",
    description: "Правила валидации для поля checkbox-group.",
  });

export type FormUICheckboxGroupFieldValidation = z.infer<
  typeof FormUICheckboxGroupFieldValidationSchema
>;
