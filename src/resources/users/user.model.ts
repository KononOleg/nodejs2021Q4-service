import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { IResponseUser } from './interfaces/IResponseUser';
import { IUser } from './interfaces/IUser';

@Entity()
class User {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column()
  name!: string;

  @Column()
  login!: string;

  @Column()
  password!: string;
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
