import z from "zod";

export const FormUIOptionsResponseMapSchema = z
  .object({
    itemsPath: z.string().nullable().meta({
      description: "Путь к массиву элементов в ответе API; null означает корень.",
    }),
    valueField: z.string().meta({
      description: "Имя поля элемента, используемого как value.",
    }),
    labelField: z.string().meta({
      description: "Имя поля элемента, используемого как label.",
    }),
  })
  .meta({
    id: "FormUIOptionsResponseMapSchema",
    description: "Правила преобразования ответа API в список опций.",
  });

export type FormUIOptionsResponseMap = z.infer<typeof FormUIOptionsResponseMapSchema>;
