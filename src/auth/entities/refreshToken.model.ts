// src/auth/entities/refreshToken.model.ts
import { Column, Model, Table, DataType, ForeignKey, BelongsTo, CreatedAt } from 'sequelize-typescript';
import User from './users.model';

@Table({ tableName: 'refresh_tokens' })
class RefreshToken extends Model {
  declare id: number;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  token: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  accessToken: string;

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
  declare createdAt: Date; // Added 'declare' here
}

export default RefreshToken