// src/chess/chess.module.ts
import { Module } from '@nestjs/common';
import { ChessService } from './chess.service';

@Module({
  providers: [ChessService],
  exports: [ChessService], // ✅ export it so other modules (like GameModule) can use it
})
export class ChessModule {}
