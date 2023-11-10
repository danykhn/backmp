import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as process from 'process'
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({
    credentials: true,
    methods: '*',
    //origin: ['https://app.miclinicamedica.com.ar/', 'http://app.miclinicamedica.com.ar/']
  });

  await app.listen((process.env.PORT, '0.0.0.0'));
}
bootstrap();
