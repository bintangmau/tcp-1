import { TablesEntity } from "./tables.entity";

export const tableProvider = [
  {
    provide: 'TABLE_REPOSITORY',
    useValue: TablesEntity,
  }
]
