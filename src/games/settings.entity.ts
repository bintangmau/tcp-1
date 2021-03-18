import { Column, DataType, Table, Model, PrimaryKey, AutoIncrement } from "sequelize-typescript";

@Table({
  tableName: 'Settings',
})
export class SettingsEntity extends Model<SettingsEntity> {
  
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
    type: DataType.INTEGER,
  })
  name: string;

  @Column({
    type: DataType.STRING,
  })
  rules: string;

  @Column({
    type: DataType.FLOAT,
  })
  comission: number;

  @Column({
    type: DataType.INTEGER,
  })
  isVerified: number;
}
