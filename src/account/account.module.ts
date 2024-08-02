import { Module } from '@nestjs/common';
import { AccountService } from './service/account.service';
import { SharedModule } from 'src/shared/shared.module';
import { AccountController } from './controller/account.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Account } from './entities/account.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Account]), SharedModule],
  providers: [AccountService],
  controllers: [AccountController],
  exports: [AccountService],
})
export class AccountModule {}
