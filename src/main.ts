import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { User } from './controllers/user/models/user-entity';
import { mainTable } from './main_table';
import { Logger } from '@nestjs/common';
import { createConnection } from '@typedorm/core';
import { DocumentClientV3 } from '@typedorm/document-client';
import { DynamoDBClient } from '@aws-sdk/client-dynamodb';
import { config as dotenvConfig } from 'dotenv';
import { Booking } from './controllers/booking/modles/booking-entity';

async function bootstrap() {
  dotenvConfig();

  const documentClient = new DocumentClientV3(
    new DynamoDBClient({
      region: process.env.AWS_REGION,
      endpoint: process.env.AWS_ENDPOINT,
      credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY_ID,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
      },
    }),
  );

  createConnection({
    table: mainTable,
    name: 'default',
    entities: [User, Booking],
    documentClient,
  });

  const logger = new Logger('Bootstrap');
  const app = await NestFactory.create(AppModule);

  await app.listen(3000);
  logger.log('Application is listening on port 3000');
}

bootstrap();
