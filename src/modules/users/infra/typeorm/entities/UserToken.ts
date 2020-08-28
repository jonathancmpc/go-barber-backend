import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  Generated,
} from 'typeorm';

/* Declarando o modelo de dados com decorators */
@Entity('user_tokens') // Nome da nossa tabela
class UserToken {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  @Generated('uuid')
  token: string;

  @Column()
  user_id: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

export default UserToken;
