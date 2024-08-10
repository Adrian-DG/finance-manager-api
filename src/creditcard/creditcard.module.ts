import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CreditCard } from './entities/credit-card.entity';
import { SharedModule } from 'src/shared/shared.module';
import { CreditCardService } from './services/credit-card.service';
import { CreditCardController } from './controllers/credit-card.controller';

@Module({
  imports: [TypeOrmModule.forFeature([CreditCard]), SharedModule],
  controllers: [CreditCardController],
  providers: [CreditCardService],
})
export class CreditcardModule {}
