import { injectable, inject } from 'tsyringe';
import { sign } from 'jsonwebtoken';
import bcrypt from 'bcryptjs';

import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import AppError from '@shared/errors/AppError';
import authConfig from '@config/auth';
import User from '../infra/typeorm/entities/User';

interface IRequest {
  email: string;
  password: string;
}

interface Response {
  user: User;
  token: string;
}

@injectable()
export default class AuthenticateUserService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
  ) {}

  public async execute({ email, password }: IRequest): Promise<Response> {
    const user = await this.usersRepository.findByEmail(email);

    if (!user) {
      throw new AppError('E-Mail or Password incorrect!', 401);
    }

    const passwordMatched = bcrypt.compare(password, user.password_hash);

    if (!passwordMatched) {
      throw new AppError('E-Mail or Password incorrect!', 401);
    }

    const { secret, expiresIn } = authConfig;

    const token = sign({ isTeacher: user.teacher !== null }, secret, {
      subject: user.id,
      expiresIn,
    });

    return { user, token };
  }
}
