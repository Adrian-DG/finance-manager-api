import { Module } from '@nestjs/common';
import { AccountModule } from './account/account.module';
import { SharedModule } from './shared/shared.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { join } from 'path';
import { IncomeModule } from './income/income.module';

@Module({
  imports: [
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
  ],
})
export class AppModule {}
