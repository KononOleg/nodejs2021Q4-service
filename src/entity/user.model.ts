import { Column, Entity, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { IReturnUser } from '../resources/users/interfaces/IReturnUser';
import Task from './task.model';

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

  @OneToMany(() => Task, (task) => task.user)
  task?: Task[];

  /**
   * return data user without password
   * @param {IUser} userId user Id
   * @returns {IResponseUser} data user without password
   */
  static toResponse(user: User): IReturnUser {
    const { id, name, login } = user;
    return { id, name, login };
  }
}

export default User;
