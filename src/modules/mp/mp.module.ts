import { Module } from '@nestjs/common';
import { MercadoPagoController } from './mp.controller';

@Module({
    controllers: [MercadoPagoController]
})

export class MercadoPagoModule {}