import z from "zod";

import { FormUIBaseSelectFieldSchema } from "./form-ui-base-select-field";
import { FormUIOptionsRefSchema } from "./form-ui-options-ref";

export const FormUISelectAsyncFieldSchema = FormUIBaseSelectFieldSchema.extend({
  optionsRef: FormUIOptionsRefSchema.meta({
    description: "Параметры загрузки опций из удаленного источника.",
  }),
}).meta({
  id: "FormUISelectAsyncFieldSchema",
  description: "Схема select с загрузкой опций по API.",
});

export type FormUISelectAsyncField = z.infer<typeof FormUISelectAsyncFieldSchema>;
