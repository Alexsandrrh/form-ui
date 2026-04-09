import type { FormUIField } from "../src";

const filters: FormUIField[] = [
  {
    type: "input",
    name: "name",
    label: "Наименование",
    placeholder: "Введите наименование",
    inputType: "text",
  },
  {
    type: "select",
    name: "documentType",
    label: "Тип документа",
    placeholder: "Выберете тип документа",
    multiple: false,
    options: [
      {
        label: "Письмо (исх.)",
        value: "uuid",
      },
    ],
  },
  {
    type: "select",
    name: "employees",
    label: "Сотрудники",
    placeholder: "Выберете сотрудников",
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
      {
        label: "Черновик",
        value: "draft",
      },
      {
        label: "Подписан",
        value: "signed",
      },
    ],
  },
  {
    type: "checkbox-group",
    name: "channels",
    label: "Каналы отправки",
    options: [
      {
        label: "Email",
        value: "email",
      },
      {
        label: "СЭД",
        value: "sed",
      },
      {
        label: "Бумага",
        value: "paper",
      },
    ],
  },
];
