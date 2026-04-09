# Examples

Документ содержит практические шаблоны конфигураций для всех типов полей, включая примеры strict-ошибок.

## Карта примеров по типам

| Тип поля | Когда использовать | Ключевые свойства |
| --- | --- | --- |
| `input` | Текстовые/числовые значения | `placeholder`, `inputType`, `validation` |
| `select` (sync) | Выбор из заранее известного списка | `placeholder`, `multiple`, `options`, `validation` |
| `select` (async) | Выбор из API-словаря | `placeholder`, `multiple`, `optionsRef`, `validation` |
| `checkbox` | Один логический флаг | `checked`, `validation` |
| `switch` | Переключатель состояния | `checked`, `validation` |
| `radio-group` | Выбор одного из нескольких | `options`, `validation` |
| `checkbox-group` | Выбор нескольких из списка | `options`, `validation` |

## Валидные примеры (TS)

```ts
import type { FormUIField } from "../src";

export const fields: FormUIField[] = [
  {
    type: "input",
    name: "name",
    label: "Наименование",
    placeholder: "Введите наименование",
    inputType: "text",
    validation: {
      required: true,
      minLength: 3,
      maxLength: 120,
      pattern: "^[A-Za-zА-Яа-я0-9\\s.-]+$",
    },
  },
  {
    type: "select",
    name: "documentType",
    label: "Тип документа",
    placeholder: "Выберите тип документа",
    multiple: false,
    validation: {
      required: true,
    },
    options: [
      { label: "Письмо (исх.)", value: "outgoing-letter" },
      { label: "Служебная записка", value: "memo" },
    ],
  },
  {
    type: "select",
    name: "employees",
    label: "Сотрудники",
    placeholder: "Выберите сотрудников",
    multiple: true,
    validation: {
      required: true,
      minLength: 1,
      maxLength: 20,
    },
    optionsRef: {
      method: "GET",
      endpoint: "/dictionaries/employees",
      responseMap: {
        itemsPath: null,
        labelField: "name",
        valueField: "id",
      },
    },
  },
  {
    type: "checkbox",
    name: "hasAttachment",
    label: "Только с вложениями",
    checked: true,
    validation: {
      required: true,
    },
  },
  {
    type: "switch",
    name: "isArchived",
    label: "Показывать архивные",
    checked: false,
    validation: {
      required: false,
    },
  },
  {
    type: "radio-group",
    name: "documentState",
    label: "Статус документа",
    validation: {
      required: true,
    },
    options: [
      { label: "Черновик", value: "draft" },
      { label: "Подписан", value: "signed" },
    ],
  },
  {
    type: "checkbox-group",
    name: "channels",
    label: "Каналы отправки",
    validation: {
      required: true,
      minLength: 1,
      maxLength: 3,
    },
    options: [
      { label: "Email", value: "email" },
      { label: "СЭД", value: "sed" },
      { label: "Бумага", value: "paper" },
    ],
  },
];
```

## Валидные примеры (JSON)

### input

```json
{
  "type": "input",
  "name": "title",
  "label": "Заголовок",
  "placeholder": "Введите заголовок",
  "inputType": "text",
  "validation": {
    "required": true,
    "minLength": 3,
    "maxLength": 150
  }
}
```

### select (sync)

```json
{
  "type": "select",
  "name": "priority",
  "label": "Приоритет",
  "placeholder": "Выберите приоритет",
  "multiple": false,
  "validation": {
    "required": true
  },
  "options": [
    { "label": "Низкий", "value": "low" },
    { "label": "Средний", "value": "medium" },
    { "label": "Высокий", "value": "high" }
  ]
}
```

### select (async)

```json
{
  "type": "select",
  "name": "author",
  "label": "Автор",
  "placeholder": "Выберите автора",
  "multiple": false,
  "validation": {
    "required": true,
    "minLength": 1,
    "maxLength": 1
  },
  "optionsRef": {
    "method": "GET",
    "endpoint": "/api/users",
    "responseMap": {
      "itemsPath": "data.items",
      "valueField": "id",
      "labelField": "fullName"
    }
  }
}
```

### switch

```json
{
  "type": "switch",
  "name": "notify",
  "label": "Уведомлять по почте",
  "checked": true,
  "validation": {
    "required": false
  }
}
```

## Невалидные примеры (strict)

```ts
import {
  FormUIBaseFieldSchema,
  FormUISelectSyncFieldSchema,
  FormUISwitchFieldSchema,
} from "../src/index.ts";

// 1) Base field не принимает validation
FormUIBaseFieldSchema.safeParse({
  name: "code",
  label: "Код",
  validation: { required: true },
}).success; // false

// 2) Switch принимает только required в validation
FormUISwitchFieldSchema.safeParse({
  type: "switch",
  name: "isArchived",
  label: "Показывать архивные",
  validation: { minLength: 1 },
}).success; // false

// 3) Select не принимает pattern в validation
FormUISelectSyncFieldSchema.safeParse({
  type: "select",
  name: "priority",
  label: "Приоритет",
  placeholder: "Выберите приоритет",
  validation: { pattern: "^high$" },
  options: [{ label: "Высокий", value: "high" }],
}).success; // false
```

## Разбор use-case `reports`

Файл: `use-cases/reports.ts`

Что демонстрирует сценарий:
- одновременно `select` sync и async;
- дефолтные/явные флаги `multiple` и `checked`;
- field-specific `validation` для разных типов полей;
- формат, готовый для валидации через `FormUIFieldSchema.array()`.

Рекомендуемый паттерн интеграции:
1. Хранить конфиг формы как `FormUIField[]`.
2. Перед рендером валидировать `FormUIFieldSchema.array().parse(config)`.
3. На стороне UI рендерить компонент по `type`.
