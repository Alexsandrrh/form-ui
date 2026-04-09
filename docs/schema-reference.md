# Schema Reference

Документ фиксирует публичный контракт, экспортируемый из `src/index.ts`.

## Публичный API

Основные экспорты:
- `FormUIFieldSchema`, `FormUIField`
- `FormUIBaseFieldSchema`, `FormUIBaseField`
- `FormUIValidation`
- `FormUISelectFieldSchema`, `FormUISelectField`
- `FormUISelectSyncFieldSchema`, `FormUISelectSyncField`
- `FormUISelectAsyncFieldSchema`, `FormUISelectAsyncField`
- `FormUIInputFieldSchema`, `FormUIInputField`
- `FormUICheckboxFieldSchema`, `FormUICheckboxField`
- `FormUISwitchFieldSchema`, `FormUISwitchField`
- `FormUIRadioGroupFieldSchema`, `FormUIRadioGroupField`
- `FormUICheckboxGroupFieldSchema`, `FormUICheckboxGroupField`
- `FormUIOptionSchema`, `FormUIOption`
- `FormUIOptionsRefSchema`, `FormUIOptionsRef`
- `FormUIOptionsResponseMapSchema`, `FormUIOptionsResponseMap`

Источником правды по актуальным экспортам является `src/schemas/index.ts`.

## FormUIBaseFieldSchema

Общие свойства любого поля формы.

| Поле | Тип | Обязательность | По умолчанию | Описание |
| --- | --- | --- | --- | --- |
| `name` | `string` | обязательно | - | Ключ поля в payload формы |
| `label` | `string` | обязательно | - | Отображаемое название |
| `validation` | `FormUIValidation` | опционально | - | Набор правил валидации |

## FormUIValidation

| Поле | Тип | Обязательность | Ограничения |
| --- | --- | --- | --- |
| `required` | `boolean` | опционально | - |
| `minLength` | `number` | опционально | целое, `>= 0` |
| `maxLength` | `number` | опционально | целое, `>= 0` |
| `min` | `number` | опционально | - |
| `max` | `number` | опционально | - |
| `pattern` | `string` | опционально | длина строки `>= 1` |

Типичные сочетания:
- текстовые поля: `required`, `minLength`, `maxLength`, `pattern`
- числовые поля: `required`, `min`, `max`
- группы выбора: `required`, `minLength`, `maxLength`

## Поля FormUIField

`FormUIFieldSchema` объединяет 6 вариантов поля.

### input

Схема: `FormUIInputFieldSchema`

| Поле | Тип | Обязательность | По умолчанию | Ограничения/комментарии |
| --- | --- | --- | --- | --- |
| `type` | `"input"` | обязательно | - | Дискриминатор |
| `name` | `string` | обязательно | - | Из `FormUIBaseFieldSchema` |
| `label` | `string` | обязательно | - | Из `FormUIBaseFieldSchema` |
| `validation` | `FormUIValidation` | опционально | - | Из `FormUIBaseFieldSchema` |
| `placeholder` | `string` | обязательно | - | Только для `input`/`select` |
| `inputType` | `"text" \| "email" \| "number" \| "password" \| "tel" \| "url" \| "search"` | опционально | `"text"` | HTML тип поля |

### select (общая база)

Схема: `FormUIBaseSelectFieldSchema`

| Поле | Тип | Обязательность | По умолчанию | Ограничения/комментарии |
| --- | --- | --- | --- | --- |
| `type` | `"select"` | обязательно | - | Дискриминатор |
| `name` | `string` | обязательно | - | Из `FormUIBaseFieldSchema` |
| `label` | `string` | обязательно | - | Из `FormUIBaseFieldSchema` |
| `validation` | `FormUIValidation` | опционально | - | Из `FormUIBaseFieldSchema` |
| `placeholder` | `string` | обязательно | - | Обязателен для `select` |
| `multiple` | `boolean` | опционально | `false` | Работает и для sync, и для async |

### select (sync)

Схема: `FormUISelectSyncFieldSchema`

| Поле | Тип | Обязательность | По умолчанию | Ограничения/комментарии |
| --- | --- | --- | --- | --- |
| все поля `FormUIBaseSelectFieldSchema` | - | - | - | - |
| `options` | `FormUIOption[]` | обязательно | - | Статический список опций |

### select (async)

Схема: `FormUISelectAsyncFieldSchema`

| Поле | Тип | Обязательность | По умолчанию | Ограничения/комментарии |
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

| Поле | Тип | Обязательность | По умолчанию | Ограничения/комментарии |
| --- | --- | --- | --- | --- |
| `type` | `"checkbox"` | обязательно | - | Дискриминатор |
| `name` | `string` | обязательно | - | Из `FormUIBaseFieldSchema` |
| `label` | `string` | обязательно | - | Из `FormUIBaseFieldSchema` |
| `validation` | `FormUIValidation` | опционально | - | Из `FormUIBaseFieldSchema` |
| `checked` | `boolean` | опционально | `false` | `placeholder` не используется |

### switch

Схема: `FormUISwitchFieldSchema`

| Поле | Тип | Обязательность | По умолчанию | Ограничения/комментарии |
| --- | --- | --- | --- | --- |
| `type` | `"switch"` | обязательно | - | Дискриминатор |
| `name` | `string` | обязательно | - | Из `FormUIBaseFieldSchema` |
| `label` | `string` | обязательно | - | Из `FormUIBaseFieldSchema` |
| `validation` | `FormUIValidation` | опционально | - | Из `FormUIBaseFieldSchema` |
| `checked` | `boolean` | опционально | `false` | `placeholder` не используется |

### radio-group

Схема: `FormUIRadioGroupFieldSchema`

| Поле | Тип | Обязательность | По умолчанию | Ограничения/комментарии |
| --- | --- | --- | --- | --- |
| `type` | `"radio-group"` | обязательно | - | Дискриминатор |
| `name` | `string` | обязательно | - | Из `FormUIBaseFieldSchema` |
| `label` | `string` | обязательно | - | Из `FormUIBaseFieldSchema` |
| `validation` | `FormUIValidation` | опционально | - | Из `FormUIBaseFieldSchema` |
| `options` | `FormUIOption[]` | обязательно | - | Выбор одного значения |

### checkbox-group

Схема: `FormUICheckboxGroupFieldSchema`

| Поле | Тип | Обязательность | По умолчанию | Ограничения/комментарии |
| --- | --- | --- | --- | --- |
| `type` | `"checkbox-group"` | обязательно | - | Дискриминатор |
| `name` | `string` | обязательно | - | Из `FormUIBaseFieldSchema` |
| `label` | `string` | обязательно | - | Из `FormUIBaseFieldSchema` |
| `validation` | `FormUIValidation` | опционально | - | Из `FormUIBaseFieldSchema` |
| `options` | `FormUIOption[]` | обязательно | - | Выбор нескольких значений |

## FormUIOption

| Поле | Тип | Обязательность | Описание |
| --- | --- | --- | --- |
| `label` | `string` | обязательно | Текст, который видит пользователь |
| `value` | `string` | обязательно | Значение для payload |
