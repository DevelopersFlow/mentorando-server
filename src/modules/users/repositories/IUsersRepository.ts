import User from '../infra/typeorm/entities/User';

import ICreateUserDTO from '../dtos/ICreateUserDTO';

export default interface IUsersRepository {
  create(data: ICreateUserDTO): Promise<User>;
  save(user: User): Promise<User>;
  find(): Promise<User[]>;
  findById(id: string): Promise<User | undefined>;
  findByIds(ids: string[]): Promise<User[]>;
  findByEmail(email: string): Promise<User | undefined>;
  findByUsername(username: string): Promise<User | undefined>;
  delete(id: string): Promise<void>;
}
