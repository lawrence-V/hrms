import { NestFactory } from '@nestjs/core';
import { Logger } from '@nestjs/common';
import { AppModule } from './app.module';
import { PrismaService } from './prisma/prisma.service';

async function bootstrap() {
  const logger = new Logger('Bootstrap');
  const app = await NestFactory.create(AppModule);

  const prisma = app.get(PrismaService);
  try {
    await prisma.$queryRaw`SELECT 1`;
    logger.log('DATABASE CONNECTED');
    console.log('\n✅ DATABASE CONNECTED\n');
  } catch (error) {
    logger.error('DATABASE CONNECTION FAILED', error);
    throw error;
  }

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
