import z from "zod";

import { FormUIOptionsResponseMapSchema } from "./form-ui-options-response-map";

export const FormUIOptionsRefSchema = z
  .object({
    method: z.string().uppercase().meta({
      description: "HTTP-метод запроса словаря.",
    }),
    endpoint: z.string().meta({
      description: "URL или путь для загрузки опций.",
    }),
    responseMap: FormUIOptionsResponseMapSchema.meta({
      description: "Правила маппинга ответа API в формат опций.",
    }),
  })
  .meta({
    id: "FormUIOptionsRefSchema",
    description: "Конфигурация удаленного источника опций.",
  });

export type FormUIOptionsRef = z.infer<typeof FormUIOptionsRefSchema>;
