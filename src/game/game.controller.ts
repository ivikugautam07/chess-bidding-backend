// import {
//   Controller,
//   Get,
//   Post,
//   Body,
//   Param,
//   ParseIntPipe,
//   Req,
//   UseGuards,
//   NotFoundException,
// } from '@nestjs/common';
// import { GameService } from './game.service';
// import { CreateBidDto } from './dto/create-bid.dto'; // DTO for validating incoming bid data
// import { JwtGuard } from '../auth/guard/jwt.guard'; // Guard to protect routes using JWT
// import { Request } from 'express';
// import { CreateGameDto } from './dto/create-game.dto';
// import { CreateMoveDto } from 'src/move/dto/create-move.dto';

// // Extend the Request type to include the authenticated user object
// interface RequestWithUser extends Request {
//   user: {
//     id: number;
//     email: string;
//   };
// }

// @Controller('games') // All routes in this controller will start with /games
// export class GameController {
//   constructor(private readonly gameService: GameService) {}
//   @Get(':id/board')
//   async getBoard(@Param('id', ParseIntPipe) id: number) {
//     return this.gameService.getBoardByGameId(id);
//   }
//   // GET /games/:id — fetch a specific game's data by its ID
//   @Get(':id')
//   async getGame(@Param('id', ParseIntPipe) id: number) {
//     // Get game from database using the service
//     const game = await this.gameService.getGameById(id);

//     // If no game found, return 404 Not Found
//     if (!game) throw new NotFoundException('Game not found');

//     // Return simplified game details
//     return {
//       id: game.id,
//       status: game.status,
//       whitePlayer: game.whitePlayer.email,
//       blackPlayer: game.blackPlayer.email,
//       moves: game.moves.map((m) => ({
//         number: m.moveNumber,
//         san: m.san,
//       })),
//     };
//   }

//   // POST /games/:id/bid — place a bid on a specific game (protected route)
//   @Post(':id/bid')
//   @UseGuards(JwtGuard) // Only allow access to users with a valid JWT
//   async placeBid(
//     @Param('id', ParseIntPipe) gameId: number, // Extract game ID from URL and convert to number
//     @Body() dto: CreateBidDto,                // Extract and validate bid data from request body
//     @Req() req: RequestWithUser,              // Extract the authenticated user from the request
//   ) {
//     // Call service to save the bid in the database
//     const bid = await this.gameService.placeBid(gameId, req.user.id, dto);

//     // Return success response
//     return {
//       message: 'Bid placed successfully',
//       bid,
//     };
//   }
//   @Post()
//   async createGame(@Body() dto: CreateGameDto) {
//     return this.gameService.createGame(dto.whitePlayerId, dto.blackPlayerId);
//   }
//   // src/game/game.controller.ts

// @Post(':id/move')
//   async submitMove(
//     @Param('id', ParseIntPipe) gameId: number,
//     @Body() dto: CreateMoveDto,
//   ) {
//     return this.gameService.submitMove(gameId, dto);
//   }

// }
import {
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Body,
} from '@nestjs/common';
import { GameService } from './game.service';
import { CreateMoveDto } from 'src/move/dto/create-move.dto';
import { CreateBidDto } from './dto/create-bid.dto';

@Controller('games')
export class GameController {
  constructor(private readonly gameService: GameService) {}

  // ✅ Get full game details
  @Get(':id')
  async getGameById(@Param('id', ParseIntPipe) id: number) {
    return this.gameService.getGameById(id);
  }

  // ✅ Create a new game
  @Post()
  async createGame(
    @Body('whitePlayerId', ParseIntPipe) whitePlayerId: number,
    @Body('blackPlayerId', ParseIntPipe) blackPlayerId: number,
  ) {
    return this.gameService.createGame(whitePlayerId, blackPlayerId);
  }

  // ✅ Submit a move
  @Post(':id/move')
  async submitMove(
    @Param('id', ParseIntPipe) gameId: number,
    @Body() dto: CreateMoveDto,
  ) {
    return this.gameService.submitMove(gameId, dto);
  }

  // ✅ Place a bid
  @Post(':id/bid')
  async placeBid(
    @Param('id', ParseIntPipe) gameId: number,
    @Body('userId', ParseIntPipe) userId: number,
    @Body() dto: CreateBidDto,
  ) {
    return this.gameService.placeBid(gameId, userId, dto);
  }

  // ✅ Get board state (PGN, FEN, turn)
  @Get(':id/board')
  async getBoard(@Param('id', ParseIntPipe) gameId: number) {
    return this.gameService.getBoardByGameId(gameId);
  }
}
