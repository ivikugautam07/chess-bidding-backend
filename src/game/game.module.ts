// src/game/game.module.ts
import { Module } from '@nestjs/common';
import { GameService } from './game.service';
import { GameController } from './game.controller';
import { PrismaService } from '../prisma/prisma.service';
import { ChessModule } from '../chess/chess.module'; // ✅ Add this

@Module({
  imports: [ChessModule], // ✅ Make sure it's listed here
  controllers: [GameController],
  providers: [GameService, PrismaService],
})
export class GameModule {}
