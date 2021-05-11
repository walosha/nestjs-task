import { Repository, EntityRepository } from 'typeorm';
import { User } from './user.entity';
import { UserCredentialsDto } from './dto/user-credentials.dto';
import * as bcrypt from 'bcryptjs';
import {
  ConflictException,
  InternalServerErrorException,
} from '@nestjs/common';
import { JwtPayload } from './jwt-payload.interface';

@EntityRepository(User)
export class UserRepository extends Repository<User> {
  async signUp(userCredentialsDto: UserCredentialsDto): Promise<void> {
    const { username, email, password } = userCredentialsDto;
    const newUser = new User();
    newUser.username = username;
    newUser.email = email;
    newUser.password = await this.hashPassword(password);

    try {
      await newUser.save();
    } catch (error) {
      if (error.code === '23505') {
        throw new ConflictException('User already exist!');
      }
      throw new InternalServerErrorException();
    }
  }

  async validateUser(
    userCredentialsDto: UserCredentialsDto,
  ): Promise<JwtPayload> {
    const { username, password } = userCredentialsDto;
    let user = await this.findOne({ username });

    if (user && (await user.validatePassword(password))) {
      return { username: user.username, email: user.email };
    }

    return null;
  }

  async hashPassword(password: string) {
    const salt = await bcrypt.genSaltSync(10);
    return await bcrypt.hashSync(password, salt);
  }
}
