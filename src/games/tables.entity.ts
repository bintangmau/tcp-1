import { Column, DataType, Table, Model, PrimaryKey, AutoIncrement, NotNull } from "sequelize-typescript";

@Table({
  tableName: 'Tables',
})
export class TablesEntity extends Model<TablesEntity> {
  
  @PrimaryKey
  @AutoIncrement
  @Column({
    type: DataType.INTEGER
  })
  id: number;

  @Column({
    type: DataType.INTEGER,
  })
  game_id: number;

  @Column({
    type: DataType.INTEGER,
  })
  user_id: number;

  @Column({
    type: DataType.STRING,
  })
  setting_id: string;

  @Column({
    type: DataType.STRING,
  })
  name: string;

  @Column({
    type: DataType.ENUM,
    values: ['30', '60'],
  })
  type: string;

  @Column({
    type: DataType.STRING,
  })
  key: string;
  
}
