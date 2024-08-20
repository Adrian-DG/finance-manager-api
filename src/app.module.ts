import { Module } from '@nestjs/common';
import { AccountModule } from './account/account.module';
import { SharedModule } from './shared/shared.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { join } from 'path';
import { IncomeModule } from './income/income.module';
import { CreditcardModule } from './creditcard/creditcard.module';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { ConfigModule } from '@nestjs/config';
import { APP_INTERCEPTOR } from '@nestjs/core';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRoot({
      type: 'better-sqlite3',
      database: '.db/data.sqlite3',
      autoLoadEntities: true,
      synchronize: false,
      entities: [join(__dirname, '**', '*.entity.{js, ts}')],
      logging: true,
    }),
    AccountModule,
    SharedModule,
    IncomeModule,
    CreditcardModule,
    AuthModule,
    UserModule,
  ],
  providers: [],
})
export class AppModule {}
