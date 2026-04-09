import z from "zod";

import { FormUICheckboxFieldSchema } from "./form-ui-checkbox-field";
import { FormUIInputFieldSchema } from "./form-ui-input-field";
import { FormUISelectFieldSchema } from "./form-ui-select-field";
import { FormUISwitchFieldSchema } from "./form-ui-switch-field";

export const FormUIFieldSchema = z
  .union([
    FormUIInputFieldSchema,
    FormUISelectFieldSchema,
    FormUICheckboxFieldSchema,
    FormUISwitchFieldSchema,
  ])
  .meta({
    id: "FormUIFieldSchema",
    description: "Объединенная схема всех полей формы.",
  });

export type FormUIField = z.infer<typeof FormUIFieldSchema>;
