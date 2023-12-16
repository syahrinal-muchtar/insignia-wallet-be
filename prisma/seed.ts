import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcrypt';

const prisma = new PrismaClient();

const roundsOfHashing = 10;

async function main() {
  const passDefault = await bcrypt.hash('password', roundsOfHashing);

  const user1 = await prisma.user.upsert({
    where: { id: 1 },
    update: {},
    create: {
      email: 'andi@email.com',
      name: 'Andi',
      password: passDefault,
    },
  });

  const user2 = await prisma.user.upsert({
    where: { id: 2 },
    update: {},
    create: {
      email: 'budi@email.com',
      name: 'Budi',
      password: passDefault,
    },
  });

  const wallet1 = await prisma.wallet.upsert({
    where: { id: 1 },
    update: {},
    create: {
      balance: 1000000,
      userId: 1,
    },
  });

  const wallet2 = await prisma.wallet.upsert({
    where: { id: 2 },
    update: {},
    create: {
      balance: 1000000,
      userId: 2,
    },
  });

  const transType1 = await prisma.transactionType.upsert({
    where: { id: 1 },
    update: {},
    create: { name: 'Top Up' },
  });

  const transType2 = await prisma.transactionType.upsert({
    where: { id: 2 },
    update: {},
    create: { name: 'transfer' },
  });

  const transList1 = await prisma.transactionList.upsert({
    where: { id: 1 },
    update: {},
    create: {
      userId: 1,
      receiverId: 2,
      amount: 10000,
      transactionTypeId: 2,
    },
  });

  const transList2 = await prisma.transactionList.upsert({
    where: { id: 2 },
    update: {},
    create: {
      userId: 1,
      amount: 10000,
      transactionTypeId: 1,
    },
  });

  const transList3 = await prisma.transactionList.upsert({
    where: { id: 3 },
    update: {},
    create: {
      userId: 2,
      receiverId: 1,
      amount: 10000,
      transactionTypeId: 2,
    },
  });

  const transList4 = await prisma.transactionList.upsert({
    where: { id: 4 },
    update: {},
    create: {
      userId: 2,
      amount: 10000,
      transactionTypeId: 1,
    },
  });

  console.log({
    user1,
    user2,
    wallet1,
    wallet2,
    transType1,
    transType2,
    transList1,
    transList2,
    transList3,
    transList4,
  });
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    // close Prisma Client at the end
    await prisma.$disconnect();
  });
