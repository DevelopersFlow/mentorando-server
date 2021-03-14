/* eslint-disable @typescript-eslint/no-unused-vars */
import { uuid } from 'uuidv4';

import ICreateUserDTO from '@modules/users/dtos/ICreateUserDTO';
import IUsersRepository from '../IUsersRepository';

import User from '../../infra/typeorm/entities/User';

class FakeUsersRepository implements IUsersRepository {
  private users: User[] = [];

  public async create(data: ICreateUserDTO): Promise<User> {
    const user = new User();

    Object.assign(user, { id: uuid() }, data);

    this.users.push(user);

    return user;
  }

  public async save(user: User): Promise<User> {
    const findIndex = this.users.findIndex(findUser => findUser.id === user.id);

    this.users[findIndex] = user;

    return user;
  }

  public async findByEmail(email: string): Promise<User | undefined> {
    const user = new User();

    return user;
  }

  public async find(): Promise<User[]> {
    throw new Error('Method not implemented.');
  }

  public async findById(id: string): Promise<User | undefined> {
    throw new Error('Method not implemented.');
  }

  public async findByIds(ids: string[]): Promise<User[]> {
    throw new Error('Method not implemented.');
  }

  public async findByUsername(username: string): Promise<User | undefined> {
    throw new Error('Method not implemented.');
  }

  public async delete(id: string): Promise<void> {
    throw new Error('Method not implemented.');
  }
}

export default FakeUsersRepository;
