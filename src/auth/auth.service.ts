import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserRepository } from './user.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { UserCredentialsDto } from './dto/user-credentials.dto';
import { JwtService } from '@nestjs/jwt';
import { JwtPayload } from './jwt-payload.interface';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(UserRepository)
    private userRepository: UserRepository,
    private jwtService: JwtService,
  ) {}

  async signUp(userCredentialsDto: UserCredentialsDto) {
    return await this.userRepository.signUp(userCredentialsDto);
  }

  async signin(
    userCredentialsDto: UserCredentialsDto,
  ): Promise<{ accessToken: string }> {
    const user = await this.userRepository.validateUser(userCredentialsDto);
    if (!user) throw new UnauthorizedException(`Invalid Credentials`);
    const payload: JwtPayload = user;
    const accessToken = this.jwtService.sign(payload);
    return { accessToken };
  }
}
