// src/posts/entities/post.model.ts
import { Column, Model, Table, DataType, ForeignKey, BelongsTo } from 'sequelize-typescript';
import User from 'src/auth/entities/users.model';

@Table({ tableName: 'posts' })
class Post extends Model {
  declare id: number;

  @Column({
    type: DataType.STRING(255),
    allowNull: false,
  })
  title: string;

  @Column({
    type: DataType.TEXT,
    allowNull: false,
  })
  content: string;

  @ForeignKey(() => User)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  userId: number;

  @BelongsTo(() => User, { onDelete: 'CASCADE' }) // Eager loading can be handled in queries
  user: User;
}

export default Post;