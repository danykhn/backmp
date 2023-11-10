import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({
    credentials: true,
    methods: '*',
    //origin: ['https://app.miclinicamedica.com.ar/', 'http://app.miclinicamedica.com.ar/']
  });
  const PORT = process.env.port || 3091;
  await app.listen(PORT, () => Logger.log(`Server started on http://localhost:${PORT}/api/doc`));
}
bootstrap();
