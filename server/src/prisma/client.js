import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
async function main() {
  try {
    await prisma.$connect(); // connect manually
    console.log('✅ Prisma connected to MongoDB');
  } catch (error) {
    console.error('❌ Prisma failed to connect to MongoDB:', error);
  }
}

main();

export default prisma;
