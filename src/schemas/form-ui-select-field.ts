import z from "zod";

import { FormUISelectAsyncFieldSchema } from "./form-ui-select-async-field";
import { FormUISelectSyncFieldSchema } from "./form-ui-select-sync-field";

export const FormUISelectFieldSchema = z
  .union([FormUISelectSyncFieldSchema, FormUISelectAsyncFieldSchema])
  .meta({
    id: "FormUISelectFieldSchema",
    description: "Объединенная схема всех select-полей.",
  });

export type FormUISelectField = z.infer<typeof FormUISelectFieldSchema>;
