import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function debugPrintUsersAndGames() {
  const users = await prisma.user.findMany();
  const games = await prisma.game.findMany({
    include: {
      whitePlayer: true,
      blackPlayer: true,
    },
  });

  console.log('\n=== USERS ===');
  users.forEach((u) => {
    console.log(`ID: ${u.id}, Email: ${u.email}`);
  });

  console.log('\n=== GAMES ===');
  games.forEach((g) => {
    console.log(`Game ID: ${g.id}, White: ${g.whitePlayer.email} (ID: ${g.whitePlayerId}), Black: ${g.blackPlayer.email} (ID: ${g.blackPlayerId})`);
  });

  await prisma.$disconnect();
}

debugPrintUsersAndGames();
