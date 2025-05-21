import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { PrismaService } from './prisma/prisma.service';
import { GameModule } from './game/game.module';

@Module({

  imports: [AuthModule,GameModule],
  providers: [PrismaService],
  exports: [PrismaService],
})
export class AppModule {}
