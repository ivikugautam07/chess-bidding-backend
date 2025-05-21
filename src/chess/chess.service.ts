import { Injectable } from '@nestjs/common';
import { Chess } from 'chess.js';

@Injectable()
export class ChessService {
  // Replays moves from database to rebuild board position
  getPositionFromMoves(moves: { from: string; to: string; san: string }[]) {
    const chess = new Chess();
    for (const move of moves) {
      chess.move({ from: move.from, to: move.to });
    }
    return chess;
  }
  getBoardState(moves: { from: string; to: string; san: string }[]) {
    const chess = this.getPositionFromMoves(moves);
    return {
      fen: chess.fen(),
      pgn: chess.pgn(),
      turn: chess.turn(), // 'w' or 'b'
    };
  }
  // Checks if a move is legal given the current history
  isMoveLegal(moves: { from: string; to: string; san: string }[], from: string, to: string): boolean {
    const chess = this.getPositionFromMoves(moves);
    try {
      const result = chess.move({ from, to });
      return !!result;
    } catch (e) {
      return false;
    }
  }

  // Get the SAN for a move (e.g. "e4", "Nf3")
  getSan(moves: { from: string; to: string; san: string }[], from: string, to: string): string | null {
    const chess = this.getPositionFromMoves(moves);
    const move = chess.move({ from, to });
    return move?.san ?? null;
  }

  // Get FEN from current game state
  getFen(moves: { from: string; to: string; san: string }[]): string {
    return this.getPositionFromMoves(moves).fen();
  }

  // Get PGN (full move list)
  getPgn(moves: { from: string; to: string; san: string }[]): string {
    return this.getPositionFromMoves(moves).pgn();
  }
}
