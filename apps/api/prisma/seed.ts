/**
 * Database seed file
 */

import { prisma } from '../src/lib/prisma';
import { hashPassword } from '../src/lib/password';

async function main() {
  console.log('Seeding database...');

  // Create admin user
  const adminPassword = await hashPassword('admin123456');
  
  const admin = await prisma.user.upsert({
    where: { email: 'admin@halaltinder.com' },
    update: {},
    create: {
      email: 'admin@halaltinder.com',
      name: 'Admin User',
      password: adminPassword,
      role: 'ADMIN',
      verified: true,
      profile: {
        create: {
          age: 30,
          gender: 'MALE',
          location: 'Global',
          verified: true,
        },
      },
    },
  });

  console.log('Created admin user:', admin.id);

  // Create test user
  const userPassword = await hashPassword('user123456');
  
  const user = await prisma.user.upsert({
    where: { email: 'user@halaltinder.com' },
    update: {},
    create: {
      email: 'user@halaltinder.com',
      name: 'Test User',
      password: userPassword,
      role: 'USER',
      verified: true,
      profile: {
        create: {
          age: 25,
          gender: 'FEMALE',
          bio: 'Looking for someone special',
          location: 'New York',
          verified: true,
          preferences: {
            create: {
              ageMin: 25,
              ageMax: 35,
              genders: ['MALE'],
              seekingMarriage: true,
            },
          },
        },
      },
    },
  });

  console.log('Created test user:', user.id);
  console.log('Seeding completed successfully!');
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
