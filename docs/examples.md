# Examples

Документ содержит практические шаблоны конфигураций для всех типов полей.

## Карта примеров по типам

| Тип поля | Когда использовать | Ключевые свойства |
| --- | --- | --- |
| `input` | Текстовые/числовые значения | `placeholder`, `inputType`, `validation` |
| `select` (sync) | Выбор из заранее известного списка | `placeholder`, `multiple`, `options` |
| `select` (async) | Выбор из API-словаря | `placeholder`, `multiple`, `optionsRef` |
| `checkbox` | Один логический флаг | `checked` |
| `switch` | Переключатель состояния | `checked` |
| `radio-group` | Выбор одного из нескольких | `options` |
| `checkbox-group` | Выбор нескольких из списка | `options` |

## Примеры полей (TS)

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
  },
  {
    type: "switch",
    name: "isArchived",
    label: "Показывать архивные",
    checked: false,
  },
  {
    type: "radio-group",
    name: "documentState",
    label: "Статус документа",
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

## Примеры полей (JSON)

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

### checkbox

```json
{
  "type": "checkbox",
  "name": "isPublic",
  "label": "Публичный документ",
  "checked": false
}
```

### switch

```json
{
  "type": "switch",
  "name": "notify",
  "label": "Уведомлять по почте",
  "checked": true
}
```

### radio-group

```json
{
  "type": "radio-group",
  "name": "status",
  "label": "Статус",
  "options": [
    { "label": "Черновик", "value": "draft" },
    { "label": "Опубликован", "value": "published" }
  ]
}
```

### checkbox-group

```json
{
  "type": "checkbox-group",
  "name": "channels",
  "label": "Каналы",
  "validation": {
    "required": true,
    "minLength": 1,
    "maxLength": 2
  },
  "options": [
    { "label": "Email", "value": "email" },
    { "label": "СЭД", "value": "sed" },
    { "label": "Бумага", "value": "paper" }
  ]
}
```

## Разбор use-case `reports`

Файл: `use-cases/reports.ts`

Что демонстрирует сценарий:
- одновременно `select` sync и async;
- дефолтные/явные флаги `multiple` и `checked`;
- использование `validation` для текстов и групп;
- общий формат, готовый для валидации через `FormUIFieldSchema.array()`.

Рекомендуемый паттерн интеграции:
1. Хранить конфиг формы как `FormUIField[]`.
2. Перед рендером валидировать `FormUIFieldSchema.array().parse(config)`.
3. На стороне UI рендерить компонент по `type`.
