import z from "zod";

export const FormUIBaseFieldSchema = z
  .object({
    name: z.string().meta({
      description: "Ключ поля в данных формы и payload.",
    }),
    label: z.string().meta({
      description: "Отображаемое название поля.",
    }),
  })
  .meta({
    id: "FormUIBaseFieldSchema",
    description: "Общие свойства любого поля формы.",
  });

export type FormUIBaseField = z.infer<typeof FormUIBaseFieldSchema>;
