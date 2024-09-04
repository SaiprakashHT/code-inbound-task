import { IsString, IsEmail, IsNotEmpty, MinLength } from 'class-validator';

export class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  readonly username: string;

  @IsEmail()
  readonly email: string;

  @IsString()
  @MinLength(6)
  readonly password: string;
}
