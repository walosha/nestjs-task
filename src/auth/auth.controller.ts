import {
  Controller,
  Post,
  Body,
  ValidationPipe,
  Get,
  UseGuards,
  Req,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { UserCredentialsDto } from './dto/user-credentials.dto';
import { GetUser } from './gwt-user.decorator';
import { JwtStrategy } from './jwt.strategy';
import { User } from './user.entity';

@Controller('auth')
export class AuthController {
  constructor(
    private authService: AuthService,
    private jwtStrategy: JwtStrategy,
  ) {}

  @Post('/signup')
  signUp(@Body(ValidationPipe) userCredentialsDto: UserCredentialsDto) {
    return this.authService.signUp(userCredentialsDto);
  }

  @Post('/signin')
  signIn(@Body(ValidationPipe) userCredentialsDto: UserCredentialsDto) {
    return this.authService.signin(userCredentialsDto);
  }

  @UseGuards(AuthGuard())
  @Get('/me')
  getuser(@GetUser() user: User) {
    return this.jwtStrategy.validate(user);
  }
}
