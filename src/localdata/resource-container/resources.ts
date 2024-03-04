interface IResource {
  name: string;
  count: string;
}

enum EnumResources {
  noResource = "Отсутствуют! Приносим свои извинения...",
  soonResource = "Скоро... Спасибо за понимание!",
  noMyConfiguration = "У вас отсутствуют конфигурации",
  noCustomConfiguration = "Отсутствуют произвольные конфигурации",
}

export interface IResourcesList {
  id: number;
  name: string;
  resources?: IResource[][];
  noResources: EnumResources;
}

export const resourcesList: IResourcesList[] = [
  {
    id: 1,
    name: "Standart Line",
    resources: [
      [
        { name: "CPU", count: "1" },
        { name: "RAM", count: "2 GB" },
      ],
      [
        { name: "CPU", count: "2" },
        { name: "RAM", count: "3 GB" },
      ],
      [
        { name: "CPU", count: "1" },
        { name: "RAM", count: "4 GB" },
      ],
      [
        { name: "CPU", count: "2" },
        { name: "RAM", count: "1 GB" },
      ],
      [
        { name: "CPU", count: "2" },
        { name: "RAM", count: "2 GB" },
      ],
      [
        { name: "CPU", count: "2" },
        { name: "RAM", count: "3 GB" },
      ],
      [
        { name: "CPU", count: "2" },
        { name: "RAM", count: "4 GB" },
      ],
      [
        { name: "", count: "" },
        { name: "", count: "" },
      ],
      [
        { name: "CPU", count: "2" },
        { name: "RAM", count: "8 GB" },
      ],
      [
        { name: "CPU", count: "4" },
        { name: "RAM", count: "16 GB" },
      ],
      [
        { name: "CPU", count: "4" },
        { name: "RAM", count: "24 GB" },
      ],
      [
        { name: "CPU", count: "10" },
        { name: "RAM", count: "10 GB" },
      ],
    ],
    noResources: EnumResources.noResource,
  },
  {
    id: 2,
    name: "CPU Line",
    noResources: EnumResources.soonResource,
  },
  {
    id: 3,
    name: "Memory Line",
    noResources: EnumResources.noResource,
  },
  {
    id: 4,
    name: "Произвольная конфигурация",
    noResources: EnumResources.noCustomConfiguration,
  },
  {
    id: 5,
    name: "Мои конфигурации",
    noResources: EnumResources.noMyConfiguration,
  },
];
