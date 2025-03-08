import { Column, Model, Table, DataType, HasMany } from 'sequelize-typescript';
import AccessToken from './accessToken.model';
import RefreshToken from './refreshToken.model';

@Table({ tableName: 'users' })
class User extends Model {
  declare id: number;

  @Column({
    type: DataType.STRING(255),
    allowNull: false,
  })
  username: string;

  @Column({
    type: DataType.STRING(255),
    allowNull: false,
    unique: true,
  })
  email: string;

  @Column({
    type: DataType.STRING(255),
    allowNull: false,
  })
  password: string;

  @HasMany(() => AccessToken)
  accessTokens: AccessToken[];

  @HasMany(() => RefreshToken)
  refreshTokens: RefreshToken[];
}

export default User