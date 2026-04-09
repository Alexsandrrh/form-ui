import z from "zod";

export const FormUIRequiredRule = z.boolean().optional().meta({
  description: "Поле обязательно для заполнения.",
});

export const FormUIMinLengthRule = z.number().int().nonnegative().optional().meta({
  description: "Минимальная длина значения.",
});

export const FormUIMaxLengthRule = z.number().int().nonnegative().optional().meta({
  description: "Максимальная длина значения.",
});

export const FormUIMinRule = z.number().optional().meta({
  description: "Минимальное числовое значение.",
});

export const FormUIMaxRule = z.number().optional().meta({
  description: "Максимальное числовое значение.",
});

export const FormUIPatternRule = z.string().min(1).optional().meta({
  description: "Регулярное выражение для проверки формата.",
});
