import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { PrismaModule } from '../prisma/prisma.module';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './strategy/jwt.strategy';
import { PassportModule } from '@nestjs/passport';

@Module({
  imports: [
    PrismaModule,
    JwtModule.register({
      secret: 'super_secret_random_string_1234567890', // ⚠️ Later, move this to env variable
      signOptions: { expiresIn: '1h' }, // Token will expire in 1 hour
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService , JwtStrategy],
})
export class AuthModule {}
