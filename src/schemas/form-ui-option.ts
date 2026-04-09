import z from "zod";

export const FormUIOptionSchema = z
  .object({
    label: z.string().meta({
      description: "Текст опции, который видит пользователь.",
    }),
    value: z.string().meta({
      description: "Значение опции, отправляемое в результат формы.",
    }),
  })
  .meta({
    id: "FormUIOptionSchema",
    description: "Элемент списка опций для синхронного select.",
  });

export type FormUIOption = z.infer<typeof FormUIOptionSchema>;
