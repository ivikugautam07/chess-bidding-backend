import { ChessService } from './chess.service';

describe('ChessService', () => {
  let service: ChessService;

  beforeEach(() => {
    service = new ChessService();
  });

  it('should return true for legal moves in order', () => {
    expect(service.isMoveLegal('e4')).toBe(true);     // White's move
    service.loadMoves(['e4']);                        // Load that move
    expect(service.isMoveLegal('e5')).toBe(true);     // Now Black can respond
  });

  it('should return false for an illegal move', () => {
    expect(service.isMoveLegal('invalid')).toBe(false);
    expect(service.isMoveLegal('e9')).toBe(false);
  });
});
