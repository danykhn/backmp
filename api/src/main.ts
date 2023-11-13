import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';


async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({
    credentials: true,
    methods: '*',
    origin: ['https://s3.miclinicamedica.com.ar/', 'https://s3.miclinicamedica.com.ar/']
  });
  const PORT = process.env.port || 3075;
  await app.listen(`Server on ${PORT}`);
}
bootstrap();
