import { beforeAll, afterAll } from '@jest/globals';
import prisma from '../lib/prisma';

beforeAll(async () => {
  // Setup test database connection
  console.log('🔧 Setting up test environment...');
});

afterAll(async () => {
  // Cleanup and disconnect
  console.log('🧹 Cleaning up test environment...');
  await prisma.$disconnect();
});
