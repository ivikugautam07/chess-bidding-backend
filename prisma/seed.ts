import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

async function main() {
  // 1. Create users
  const alice = await prisma.user.create({
    data: {
      email: 'alice@test.com',
      password: 'hashed_password_1', // Replace with real hashed value later
    },
  });

  const bob = await prisma.user.create({
    data: {
      email: 'bob@test.com',
      password: 'hashed_password_2',
    },
  });

  // 2. Create a game
  const game = await prisma.game.create({
    data: {
      whitePlayerId: alice.id,
      blackPlayerId: bob.id,
      status: 'in_progress',
    },
  });

  // 3. Add a few opening moves (with from/to coordinates and SAN)
  await prisma.move.createMany({
    data: [
      {
        gameId: game.id,
        moveNumber: 1,
        san: 'e4',
        from: 'e2',
        to: 'e4',
        byUserId: alice.id,
      },
      {
        gameId: game.id,
        moveNumber: 2,
        san: 'e5',
        from: 'e7',
        to: 'e5',
        byUserId: bob.id,
      },
      {
        gameId: game.id,
        moveNumber: 3,
        san: 'Nf3',
        from: 'g1',
        to: 'f3',
        byUserId: alice.id,
      },
    ],
  });

  console.log('✅ Seeding complete');
}

main()
  .catch((e) => {
    console.error('❌ Error during seeding:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
