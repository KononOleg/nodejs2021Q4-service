import { Column, Entity, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import Task from './task.model';
import { IResponseUser } from '../resources/users/interfaces/IResponseUser';
import { IUser } from '../resources/users/interfaces/IUser';

@Entity()
class User {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column()
  name!: string;

  @Column()
  login!: string;

  @Column({ select: false })
  password!: string;

  @OneToMany(() => Task, (task) => task.user, {
    onDelete: 'SET NULL',
    onUpdate: 'CASCADE',
  })
  task?: Task[];

  /**
   * return data user without password
   * @param {IUser} userId user Id
   * @returns {IResponseUser} data user without password
   */
  static toResponse(user: IUser): IResponseUser {
    const { id, name, login } = user;
    return { id, name, login };
  }
}

export default User;
