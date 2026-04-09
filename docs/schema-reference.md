# Schema Reference

Документ фиксирует актуальный публичный контракт, экспортируемый из `src/index.ts`.

## Публичный API

Основные экспорты:
- `FormUIFieldSchema`, `FormUIField`
- `FormUIBaseFieldSchema`, `FormUIBaseField`
- `FormUIInputFieldSchema`, `FormUIInputField`
- `FormUISelectFieldSchema`, `FormUISelectField`
- `FormUISelectSyncFieldSchema`, `FormUISelectSyncField`
- `FormUISelectAsyncFieldSchema`, `FormUISelectAsyncField`
- `FormUICheckboxFieldSchema`, `FormUICheckboxField`
- `FormUISwitchFieldSchema`, `FormUISwitchField`
- `FormUIRadioGroupFieldSchema`, `FormUIRadioGroupField`
- `FormUICheckboxGroupFieldSchema`, `FormUICheckboxGroupField`
- `FormUIInputFieldValidationSchema`, `FormUIInputFieldValidation`
- `FormUISelectFieldValidationSchema`, `FormUISelectFieldValidation`
- `FormUICheckboxFieldValidationSchema`, `FormUICheckboxFieldValidation`
- `FormUISwitchFieldValidationSchema`, `FormUISwitchFieldValidation`
- `FormUIRadioGroupFieldValidationSchema`, `FormUIRadioGroupFieldValidation`
- `FormUICheckboxGroupFieldValidationSchema`, `FormUICheckboxGroupFieldValidation`
- `FormUIOptionSchema`, `FormUIOption`
- `FormUIOptionsRefSchema`, `FormUIOptionsRef`
- `FormUIOptionsResponseMapSchema`, `FormUIOptionsResponseMap`

Источником правды по экспортам является `src/schemas/index.ts`.

## Strict-поведение

Ключевые strict-правила:
- `FormUIBaseFieldSchema` объявлен через `.strict()`.
- Все `...FieldValidationSchema` объявлены через `.strict()`.
- Неподдерживаемые ключи в `validation` отклоняются.

Короткие негативные примеры:

```ts
import {
  FormUIBaseFieldSchema,
  FormUISelectFieldValidationSchema,
  FormUISwitchFieldSchema,
} from "../src/index.ts";

FormUIBaseFieldSchema.safeParse({
  name: "code",
  label: "Код",
  validation: { required: true },
}).success; // false

FormUISelectFieldValidationSchema.safeParse({
  required: true,
  pattern: "^A",
}).success; // false

FormUISwitchFieldSchema.safeParse({
  type: "switch",
  name: "archived",
  label: "Архив",
  validation: { minLength: 1 },
}).success; // false
```

## FormUIBaseFieldSchema

Общие свойства любого поля формы.

| Поле | Тип | Обязательность | По умолчанию | Описание |
| --- | --- | --- | --- | --- |
| `name` | `string` | обязательно | - | Ключ поля в payload формы |
| `label` | `string` | обязательно | - | Отображаемое название |

## Validation-схемы по типам полей

### FormUIInputFieldValidationSchema

| Поле | Тип | Обязательность | Ограничения |
| --- | --- | --- | --- |
| `required` | `boolean` | опционально | - |
| `minLength` | `number` | опционально | целое, `>= 0` |
| `maxLength` | `number` | опционально | целое, `>= 0` |
| `min` | `number` | опционально | - |
| `max` | `number` | опционально | - |
| `pattern` | `string` | опционально | длина строки `>= 1` |

### FormUISelectFieldValidationSchema

| Поле | Тип | Обязательность | Ограничения |
| --- | --- | --- | --- |
| `required` | `boolean` | опционально | - |
| `minLength` | `number` | опционально | целое, `>= 0` |
| `maxLength` | `number` | опционально | целое, `>= 0` |

### FormUICheckboxFieldValidationSchema

| Поле | Тип | Обязательность | Ограничения |
| --- | --- | --- | --- |
| `required` | `boolean` | опционально | - |

### FormUISwitchFieldValidationSchema

| Поле | Тип | Обязательность | Ограничения |
| --- | --- | --- | --- |
| `required` | `boolean` | опционально | - |

### FormUIRadioGroupFieldValidationSchema

| Поле | Тип | Обязательность | Ограничения |
| --- | --- | --- | --- |
| `required` | `boolean` | опционально | - |

### FormUICheckboxGroupFieldValidationSchema

| Поле | Тип | Обязательность | Ограничения |
| --- | --- | --- | --- |
| `required` | `boolean` | опционально | - |
| `minLength` | `number` | опционально | целое, `>= 0` |
| `maxLength` | `number` | опционально | целое, `>= 0` |

## Поля FormUIField

`FormUIFieldSchema` объединяет 6 вариантов поля.

### input

Схема: `FormUIInputFieldSchema`

| Поле | Тип | Обязательность | По умолчанию | Комментарий |
| --- | --- | --- | --- | --- |
| `type` | `"input"` | обязательно | - | Дискриминатор |
| `name` | `string` | обязательно | - | Из `FormUIBaseFieldSchema` |
| `label` | `string` | обязательно | - | Из `FormUIBaseFieldSchema` |
| `placeholder` | `string` | обязательно | - | Только для `input`/`select` |
| `validation` | `FormUIInputFieldValidation` | опционально | - | Только input-правила |
| `inputType` | `"text" \| "email" \| "number" \| "password" \| "tel" \| "url" \| "search"` | опционально | `"text"` | HTML тип поля |

### select (общая база)

Схема: `FormUIBaseSelectFieldSchema`

| Поле | Тип | Обязательность | По умолчанию | Комментарий |
| --- | --- | --- | --- | --- |
| `type` | `"select"` | обязательно | - | Дискриминатор |
| `name` | `string` | обязательно | - | Из `FormUIBaseFieldSchema` |
| `label` | `string` | обязательно | - | Из `FormUIBaseFieldSchema` |
| `placeholder` | `string` | обязательно | - | Обязателен для `select` |
| `validation` | `FormUISelectFieldValidation` | опционально | - | Только select-правила |
| `multiple` | `boolean` | опционально | `false` | Работает и для sync, и для async |

### select (sync)

Схема: `FormUISelectSyncFieldSchema`

| Поле | Тип | Обязательность | По умолчанию | Комментарий |
| --- | --- | --- | --- | --- |
| все поля `FormUIBaseSelectFieldSchema` | - | - | - | - |
| `options` | `FormUIOption[]` | обязательно | - | Статический список опций |

### select (async)

Схема: `FormUISelectAsyncFieldSchema`

| Поле | Тип | Обязательность | По умолчанию | Комментарий |
| --- | --- | --- | --- | --- |
| все поля `FormUIBaseSelectFieldSchema` | - | - | - | - |
| `optionsRef` | `FormUIOptionsRef` | обязательно | - | Правила загрузки опций из API |

#### FormUIOptionsRef

| Поле | Тип | Обязательность | Ограничения/комментарии |
| --- | --- | --- | --- |
| `method` | `string` | обязательно | строка должна быть в верхнем регистре (`uppercase`) |
| `endpoint` | `string` | обязательно | URL или относительный путь |
| `responseMap` | `FormUIOptionsResponseMap` | обязательно | Маппинг ответа API |

#### FormUIOptionsResponseMap

| Поле | Тип | Обязательность | Ограничения/комментарии |
| --- | --- | --- | --- |
| `itemsPath` | `string \| null` | обязательно | `null` означает, что массив лежит в корне ответа |
| `valueField` | `string` | обязательно | Поле элемента для `value` |
| `labelField` | `string` | обязательно | Поле элемента для `label` |

### checkbox

Схема: `FormUICheckboxFieldSchema`

| Поле | Тип | Обязательность | По умолчанию | Комментарий |
| --- | --- | --- | --- | --- |
| `type` | `"checkbox"` | обязательно | - | Дискриминатор |
| `name` | `string` | обязательно | - | Из `FormUIBaseFieldSchema` |
| `label` | `string` | обязательно | - | Из `FormUIBaseFieldSchema` |
| `validation` | `FormUICheckboxFieldValidation` | опционально | - | Только checkbox-правила |
| `checked` | `boolean` | опционально | `false` | `placeholder` не используется |

### switch

Схема: `FormUISwitchFieldSchema`

| Поле | Тип | Обязательность | По умолчанию | Комментарий |
| --- | --- | --- | --- | --- |
| `type` | `"switch"` | обязательно | - | Дискриминатор |
| `name` | `string` | обязательно | - | Из `FormUIBaseFieldSchema` |
| `label` | `string` | обязательно | - | Из `FormUIBaseFieldSchema` |
| `validation` | `FormUISwitchFieldValidation` | опционально | - | Только switch-правила |
| `checked` | `boolean` | опционально | `false` | `placeholder` не используется |

### radio-group

Схема: `FormUIRadioGroupFieldSchema`

| Поле | Тип | Обязательность | По умолчанию | Комментарий |
| --- | --- | --- | --- | --- |
| `type` | `"radio-group"` | обязательно | - | Дискриминатор |
| `name` | `string` | обязательно | - | Из `FormUIBaseFieldSchema` |
| `label` | `string` | обязательно | - | Из `FormUIBaseFieldSchema` |
| `validation` | `FormUIRadioGroupFieldValidation` | опционально | - | Только radio-group правила |
| `options` | `FormUIOption[]` | обязательно | - | Выбор одного значения |

### checkbox-group

Схема: `FormUICheckboxGroupFieldSchema`

| Поле | Тип | Обязательность | По умолчанию | Комментарий |
| --- | --- | --- | --- | --- |
| `type` | `"checkbox-group"` | обязательно | - | Дискриминатор |
| `name` | `string` | обязательно | - | Из `FormUIBaseFieldSchema` |
| `label` | `string` | обязательно | - | Из `FormUIBaseFieldSchema` |
| `validation` | `FormUICheckboxGroupFieldValidation` | опционально | - | Только group-правила |
| `options` | `FormUIOption[]` | обязательно | - | Выбор нескольких значений |

## FormUIOption

| Поле | Тип | Обязательность | Описание |
| --- | --- | --- | --- |
| `label` | `string` | обязательно | Текст, который видит пользователь |
| `value` | `string` | обязательно | Значение для payload |
