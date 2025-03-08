import { Column, Model, Table, DataType, ForeignKey, BelongsTo, CreatedAt } from 'sequelize-typescript';
import User from './users.model';

@Table({ tableName: 'access_tokens' })
class AccessToken extends Model {
  declare id: number;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  token: string;

  @ForeignKey(() => User)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  userId: number;

  @BelongsTo(() => User)
  user: User;

  @CreatedAt
  @Column({
    type: DataType.DATE,
    field: 'created_at',
  })
  declare createdAt: Date;
}

export default AccessToken; // Explicitly add default export