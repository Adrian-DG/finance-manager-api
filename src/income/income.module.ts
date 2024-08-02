import { Module } from '@nestjs/common';
import { IncomeService } from './service/income.service';
import { IncomeController } from './controller/income.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SharedModule } from 'src/shared/shared.module';
import { Income } from './entities/income.entity';
import { AccountModule } from 'src/account/account.module';
import { AccountService } from 'src/account/service/account.service';

@Module({
  imports: [TypeOrmModule.forFeature([Income]), SharedModule, AccountModule],
  providers: [IncomeService],
  controllers: [IncomeController],
})
export class IncomeModule {}
