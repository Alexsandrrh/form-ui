import z from "zod";

import { FormUIBaseSelectFieldSchema } from "./form-ui-base-select-field";
import { FormUIOptionSchema } from "./form-ui-option";

export const FormUISelectSyncFieldSchema = FormUIBaseSelectFieldSchema.extend({
  options: FormUIOptionSchema.array().meta({
    description: "Статический список доступных опций.",
  }),
}).meta({
  id: "FormUISelectSyncFieldSchema",
  description: "Схема select с заранее заданными опциями.",
});

export type FormUISelectSyncField = z.infer<typeof FormUISelectSyncFieldSchema>;
