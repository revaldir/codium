import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  // Dummy users
  const user1 = await prisma.user.upsert({
    where: { email: 'reapz@code.com' },
    update: {},
    create: {
      email: 'reapz@code.com',
      name: 'Reapz Coder',
      password: 'password123',
    },
  });

  const user2 = await prisma.user.upsert({
    where: { email: 'typi@coder.com' },
    update: {},
    create: {
      email: 'typi@coder.com',
      name: 'Typi Coder',
      password: 'password123',
    },
  });

  // Dummy articles
  const post1 = await prisma.article.upsert({
    where: { title: 'Big Data Technology in a Nutshell' },
    update: {
      authorId: user1.id,
    },
    create: {
      title: 'Big Data Technology in a Nutshell',
      slug: 'big-data-technology-in-a-nutshell',
      body: 'Big Data is growing rapidly, with the helps of the developers.',
      description:
        'Learn more about Big Data, from definition to real world use cases',
      published: false,
      authorId: user1.id,
    },
  });

  const post2 = await prisma.article.upsert({
    where: { title: 'Prisma Adds Support for MongoDB' },
    update: {
      authorId: user2.id,
    },
    create: {
      title: 'Prisma Adds Support for MongoDB',
      slug: 'prisma-adds-support-for-mongodb',
      body: 'Support for MongoDB has been one of the most requested features since the initial release of...',
      description:
        "We are excited to share that today's Prisma ORM release adds stable support for MongoDB!",
      published: false,
      authorId: user2.id,
    },
  });

  const post3 = await prisma.article.upsert({
    where: { title: 'Prisma Client Just Became a Lot More Flexible' },
    update: {},
    create: {
      title: 'Prisma Client Just Became a Lot More Flexible',
      slug: 'prisma-client-just-became-a-lot-more-flexible',
      body: 'Prisma Client extensions provide a powerful new way to add functionality to Prisma in a type-safe manner...',
      description:
        'This article will explore various ways you can use Prisma Client extensions to add custom functionality to Prisma Client...',
      published: true,
    },
  });

  console.log({ user1, user2, post1, post2, post3 });
}

// Execute seed
main()
  .catch((err) => {
    console.error(err);
    process.exit(1);
  })
  .finally(async () => {
    // close Prisma
    await prisma.$disconnect();
  });
