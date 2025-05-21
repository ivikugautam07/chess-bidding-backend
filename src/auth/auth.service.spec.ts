import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { PrismaService } from '../prisma/prisma.service';
import { JwtService, JwtModule } from '@nestjs/jwt';
import { ConflictException, UnauthorizedException } from '@nestjs/common';

describe('AuthService (real tests)', () => {
  let service: AuthService;
  let prisma: PrismaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        // ✅ Register JWT module with a secret
        JwtModule.register({
          secret: 'test-secret',
          signOptions: { expiresIn: '1h' },
        }),
      ],
      providers: [AuthService, PrismaService],
    }).compile();

    service = module.get<AuthService>(AuthService);
    prisma = module.get<PrismaService>(PrismaService);

    // 🧼 Clean database — correct deletion order
    await prisma.bid.deleteMany();
    await prisma.move.deleteMany();
    await prisma.prediction.deleteMany();
    await prisma.game.deleteMany();
    await prisma.transaction.deleteMany();
    await prisma.user.deleteMany();
  });

  it('should sign up a new user and return a token', async () => {
    const result = await service.signup({
      email: 'test@example.com',
      password: 'securepassword',
    });

    expect(result).toHaveProperty('access_token');
    expect(typeof result.access_token).toBe('string');
  });

  it('should not allow duplicate signup (email conflict)', async () => {
    await service.signup({
      email: 'conflict@example.com',
      password: 'test123',
    });

    await expect(
      service.signup({
        email: 'conflict@example.com',
        password: 'test123',
      }),
    ).rejects.toThrow(ConflictException);
  });

  it('should log in with correct credentials', async () => {
    await service.signup({
      email: 'john@example.com',
      password: 'pass123',
    });

    const result = await service.login({
      email: 'john@example.com',
      password: 'pass123',
    });

    expect(result).toHaveProperty('access_token');
  });

  it('should fail login with incorrect password', async () => {
    await service.signup({
      email: 'wrong@example.com',
      password: 'correctpass',
    });

    await expect(
      service.login({
        email: 'wrong@example.com',
        password: 'wrongpass',
      }),
    ).rejects.toThrow(UnauthorizedException);
  });
});
