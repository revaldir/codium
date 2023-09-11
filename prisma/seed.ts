import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  // Dummy articles
  const post1 = await prisma.article.upsert({
    where: { title: 'Big Data Technology in a Nutshell' },
    update: {},
    create: {
      title: 'Big Data Technology in a Nutshell',
      slug: 'big-data-technology-in-a-nutshell',
      body: 'Big Data is growing rapidly, with the helps of the developers.',
      description:
        'Learn more about Big Data, from definition to real world use cases',
      published: false,
    },
  });

  const post2 = await prisma.article.upsert({
    where: { title: 'Prisma Adds Support for MongoDB' },
    update: {},
    create: {
      title: 'Prisma Adds Support for MongoDB',
      slug: 'prisma-adds-support-for-mongodb',
      body: 'Support for MongoDB has been one of the most requested features since the initial release of...',
      description:
        "We are excited to share that today's Prisma ORM release adds stable support for MongoDB!",
      published: false,
    },
  });

  console.log({ post1, post2 });
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
