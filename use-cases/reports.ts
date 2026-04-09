import type { FormUIField } from "../src";

const filters: FormUIField[] = [
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
    placeholder: "Выберете тип документа",
    multiple: false,
    validation: {
      required: true,
    },
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
      required: true,
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
    validation: {
      required: true,
      minLength: 1,
      maxLength: 3,
    },
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
