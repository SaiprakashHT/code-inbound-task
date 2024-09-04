import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from '../user/dto/create-user.dto';
import { UserService } from '../user/user.service';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly userService: UserService,
  ) {}

  @Post('login')
  async login(@Body() userDto: CreateUserDto) {
    const user = await this.userService.findOneByUsername(userDto.username);
    if (user && await this.authService.validateUser(userDto.username, userDto.password)) {
      return this.authService.login(user);
    }
    return { message: 'Invalid credentials' };
  }
}
