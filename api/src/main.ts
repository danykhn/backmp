import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
const basicAuth = require('express-basic-auth');

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({
    credentials: true,
    methods: '*',
    origin: ['https://s3.miclinicamedica.com.ar/', 'https://s3.miclinicamedica.com.ar/']
  });
  app.setGlobalPrefix('api');
   // SWAGGER
   app.use(
    ['/api/doc', '/api-json'],
    basicAuth({
      challenge: true,
      users: {
        admin: 'admin',
      },
    }),
  );
  const config = new DocumentBuilder()
    .setTitle('Boilerplate API')
    .addBearerAuth({ type: 'http', bearerFormat: 'jwt', scheme: 'bearer', in: 'header' }, 'JWT')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api/doc', app, document);

  const PORT = process.env.port || 3075;
  await app.listen(PORT, () => Logger.log(`Server started on http://localhost:${PORT}/api/doc`));

}
bootstrap();
