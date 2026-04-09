import z from "zod";

export const FormUIValidation = z
  .object({
    required: z.boolean().optional().meta({
      description: "Поле обязательно для заполнения.",
    }),
    minLength: z.number().int().nonnegative().optional().meta({
      description: "Минимальная длина значения.",
    }),
    maxLength: z.number().int().nonnegative().optional().meta({
      description: "Максимальная длина значения.",
    }),
    min: z.number().optional().meta({
      description: "Минимальное числовое значение.",
    }),
    max: z.number().optional().meta({
      description: "Максимальное числовое значение.",
    }),
    pattern: z.string().min(1).optional().meta({
      description: "Регулярное выражение для проверки формата.",
    }),
  })
  .meta({
    id: "FormUIValidation",
    description: "Набор правил валидации значения поля.",
  });

export type FormUIValidation = z.infer<typeof FormUIValidation>;
