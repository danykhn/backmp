import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MercadoPagoModule } from './modules/mp/mp.module';

@Module({
  imports: [MercadoPagoModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
