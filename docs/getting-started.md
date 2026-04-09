# Getting Started

## Назначение пакета

`form-ui` описывает контракт полей формы через `zod`-схемы и экспортирует соответствующие TypeScript-типы.

Ключевая точка входа:
- `src/index.ts` -> реэкспорт всего публичного API из `src/schemas/index.ts`.

## Установка и импорт

```bash
bun install
```

```ts
import {
  FormUIFieldSchema,
  type FormUIField,
  FormUIInputFieldValidationSchema,
  FormUISwitchFieldValidationSchema,
} from "../src/index.ts";
```

## Базовая модель полей

`FormUIField` — union следующих типов:
- `input`
- `select` (`sync` и `async` варианты)
- `checkbox`
- `switch`
- `radio-group`
- `checkbox-group`

Общее правило модели:
- `FormUIBaseFieldSchema` содержит только общие свойства поля: `name`, `label`.

Важные инварианты:
- `placeholder` обязателен только для `input` и `select`.
- Для `checkbox` и `switch` используется `checked` с дефолтом `false`.
- Для `select` используется `multiple` с дефолтом `false`.
- Для каждого типа поля действует собственная схема `validation`.

## Карта validation-схем

| Тип поля | Схема валидации | Допустимые ключи |
| --- | --- | --- |
| `input` | `FormUIInputFieldValidationSchema` | `required`, `minLength`, `maxLength`, `min`, `max`, `pattern` |
| `select` | `FormUISelectFieldValidationSchema` | `required`, `minLength`, `maxLength` |
| `checkbox` | `FormUICheckboxFieldValidationSchema` | `required` |
| `switch` | `FormUISwitchFieldValidationSchema` | `required` |
| `radio-group` | `FormUIRadioGroupFieldValidationSchema` | `required` |
| `checkbox-group` | `FormUICheckboxGroupFieldValidationSchema` | `required`, `minLength`, `maxLength` |

## Валидация конфигурации формы

### Валидация массива полей

```ts
import { FormUIFieldSchema, type FormUIField } from "../src/index.ts";

const config: FormUIField[] = [
  {
    type: "input",
    name: "name",
    label: "Наименование",
    placeholder: "Введите наименование",
    validation: {
      required: true,
      minLength: 3,
      maxLength: 120,
    },
  },
  {
    type: "select",
    name: "documentType",
    label: "Тип документа",
    placeholder: "Выберите тип документа",
    validation: {
      required: true,
    },
    options: [
      { label: "Письмо", value: "letter" },
      { label: "Служебная записка", value: "memo" },
    ],
  },
];

const result = FormUIFieldSchema.array().safeParse(config);

if (!result.success) {
  console.error(result.error.format());
}
```

### Валидация правил для конкретного поля

```ts
import {
  FormUIInputFieldValidationSchema,
  FormUISwitchFieldValidationSchema,
} from "../src/index.ts";

const inputValidation = FormUIInputFieldValidationSchema.parse({
  required: true,
  minLength: 3,
  maxLength: 120,
  pattern: "^[A-Za-zА-Яа-я0-9\\s.-]+$",
});

const switchValidationResult = FormUISwitchFieldValidationSchema.safeParse({
  minLength: 1,
});

console.log(inputValidation);
console.log(switchValidationResult.success); // false
```

## Что читать дальше

- Полный контракт каждого типа поля и validation-схемы: [schema-reference.md](./schema-reference.md)
- Рабочие и невалидные примеры: [examples.md](./examples.md)
- Процесс изменений и поддержки документации: [contributing.md](./contributing.md)
