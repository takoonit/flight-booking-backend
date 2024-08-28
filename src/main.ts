import { NestFactory, Reflector } from '@nestjs/core';
import { AppModule } from './app.module';
import { LoggingMiddleware } from './common/middleware/logging/logging.middleware';
import { RolesGuard } from './common/guards/roles/roles.guard';
import { HttpExceptionFilter } from './common/filters/http-exception.filter';
import { INestApplication } from '@nestjs/common';

async function bootstrap(port: number) {
  const app = await NestFactory.create(AppModule);

  applyMiddleware(app);
  applyGlobalSettings(app);

  await app.listen(port);
}

function applyMiddleware(app: INestApplication) {
  app.use(new LoggingMiddleware().use);
}

function applyGlobalSettings(app: INestApplication) {
  const reflector = new Reflector();
  app.useGlobalFilters(new HttpExceptionFilter());
  app.useGlobalGuards(new RolesGuard(reflector));
}

const PORT = parseInt(process.env.PORT, 10) || 3000;
bootstrap(PORT);