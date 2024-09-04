import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UserModule } from '../user/user.module';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './jwt.strategy';
import { AuthController } from './auth.controller';

@Module({
  imports: [
    UserModule,
    PassportModule,
    JwtModule.register({
      secret: process.env.JWT_SECRET || 'defaultSecretKey', // Provide a fallback secret
      signOptions: { expiresIn: '60m' },
    }),
  ],
  providers: [AuthService, JwtStrategy],
  controllers: [AuthController], // Register AuthController here
})
export class AuthModule {}
