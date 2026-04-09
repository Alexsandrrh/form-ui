import z from "zod";

import { FormUIRequiredRule } from "./form-ui-validation-rules";

export const FormUIRadioGroupFieldValidationSchema = z
  .object({
    required: FormUIRequiredRule,
  })
  .strict()
  .meta({
    id: "FormUIRadioGroupFieldValidationSchema",
    description: "Правила валидации для поля radio-group.",
  });

export type FormUIRadioGroupFieldValidation = z.infer<
  typeof FormUIRadioGroupFieldValidationSchema
>;
