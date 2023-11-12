import { TableColumnOptions } from "typeorm";

export const commonFields: TableColumnOptions[] = [
  {
    name: "id",
    type: "int",
    isNullable: false,
    isGenerated: true,
    generationStrategy: "increment",
  },
  {
    name: "created_at",
    type: "datetime",
    isNullable: true,
  },
  {
    name: "updated_at",
    type: "datetime",
    isNullable: true,
  },
];
