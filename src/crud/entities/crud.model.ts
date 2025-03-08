// src/crud/entities/crud.model.ts
import { Column, Model, Table, DataType } from 'sequelize-typescript';

@Table({ tableName: 'crud' }) // Adjust table name as needed
class Crud extends Model {
  declare id: number; // Use declare for primary key

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  declare name: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
    unique: true,
  })
  declare email: string;
}

export default Crud;