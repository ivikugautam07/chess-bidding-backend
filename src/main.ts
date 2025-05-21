import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // ✅ Allow frontend (localhost:3001) to call backend (localhost:3000)
  app.enableCors({
    origin: 'http://localhost:3001',
    credentials: true,
  });

  // ✅ Swagger config
  const config = new DocumentBuilder()
    .setTitle('Chess Prediction Platform API')
    .setDescription('Auth and user management endpoints')
    .setVersion('1.0')
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api/docs', app, document);

  await app.listen(3000);
}
bootstrap();
