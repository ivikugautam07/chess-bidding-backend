import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateBidDto } from './dto/create-bid.dto';
import { CreateMoveDto } from 'src/move/dto/create-move.dto';
import { ChessService } from '../chess/chess.service';

@Injectable()
export class GameService {
  constructor(
    private prisma: PrismaService,
    private chessService: ChessService,
  ) {}

  // ✅ Submit a move for a given game
  async submitMove(gameId: number, dto: CreateMoveDto) {
    const game = await this.prisma.game.findUnique({
      where: { id: gameId },
      include: {
        moves: { orderBy: { moveNumber: 'asc' } },
      },
    });

    if (!game) throw new NotFoundException('Game not found');

    const moves = game.moves.map(m => ({
      from: m.from,
      to: m.to,
      san: m.san,
    }));

    const isLegal = this.chessService.isMoveLegal(moves, dto.from, dto.to);
    if (!isLegal) {
      throw new BadRequestException('Illegal move');
    }

    const san = this.chessService.getSan(moves, dto.from, dto.to) ?? '';
    const moveNumber = game.moves.length + 1;

    return this.prisma.move.create({
      data: {
        gameId,
        byUserId: dto.byUserId,
        from: dto.from,
        to: dto.to,
        san,
        moveNumber,
      },
    });
  }

  // ✅ Get board state: FEN, PGN, current turn
  async getBoardByGameId(gameId: number) {
    const game = await this.prisma.game.findUnique({
      where: { id: gameId },
      include: {
        moves: { orderBy: { moveNumber: 'asc' } },
      },
    });

    if (!game) throw new NotFoundException('Game not found');

    const moves = game.moves.map((m) => ({
      from: m.from,
      to: m.to,
      san: m.san,
    }));

    return this.chessService.getBoardState(moves);
  }

  // ✅ Places a bid on a game by a user
  async placeBid(gameId: number, userId: number, dto: CreateBidDto) {
    const game = await this.prisma.game.findUnique({
      where: { id: gameId },
    });

    if (!game) throw new NotFoundException('Game not found');

    return this.prisma.bid.create({
      data: {
        gameId,
        userId,
        moveIndex: dto.moveIndex,
        amount: dto.amount,
      },
    });
  }

  // ✅ Get full game details including players and moves
  async getGameById(gameId: number) {
    return this.prisma.game.findUnique({
      where: { id: gameId },
      include: {
        whitePlayer: true,
        blackPlayer: true,
        moves: {
          orderBy: { moveNumber: 'asc' },
        },
      },
    });
  }

  // ✅ Create a new game between two users
  async createGame(whitePlayerId: number, blackPlayerId: number) {
    const whiteExists = await this.prisma.user.findUnique({
      where: { id: whitePlayerId },
    });

    const blackExists = await this.prisma.user.findUnique({
      where: { id: blackPlayerId },
    });

    if (!whiteExists || !blackExists) {
      throw new NotFoundException('One or both player IDs are invalid');
    }

    return this.prisma.game.create({
      data: {
        whitePlayerId,
        blackPlayerId,
        status: 'in_progress',
      },
      include: {
        whitePlayer: true,
        blackPlayer: true,
        moves: true,
        predictions: true,
        bids: true,
      },
    });
  }
}
