# form-ui

`form-ui` — Bun + TypeScript пакет со схемами на `zod` для описания полей формы и валидации их конфигурации.

Пакет помогает:
- хранить единый контракт полей формы;
- валидировать JSON/TS-конфиги до рендера UI;
- типобезопасно работать с разными типами полей через union-модель `FormUIField`.

## Быстрый старт

Установка зависимостей:

```bash
bun install
```

Базовое использование (импорт из публичного entrypoint `src/index.ts`):

```ts
import { FormUIFieldSchema, type FormUIField } from "./src/index.ts";

const fields: FormUIField[] = [
  {
    type: "input",
    name: "title",
    label: "Заголовок",
    placeholder: "Введите заголовок",
    inputType: "text",
  },
  {
    type: "checkbox",
    name: "published",
    label: "Опубликовано",
    checked: false,
  },
];

const parsed = FormUIFieldSchema.array().parse(fields);
console.log(parsed);
```

Запуск локально:

```bash
bun run src/index.ts
```

## Карта документации

- [Старт и базовые принципы](./docs/getting-started.md)
- [Полный референс схем](./docs/schema-reference.md)
- [Практические примеры](./docs/examples.md)
- [Гайд для контрибьюторов](./docs/contributing.md)

## Для контрибьюторов

Процесс внесения изменений, обязательные проверки и чеклист сопровождения документации описаны в [docs/contributing.md](./docs/contributing.md).
