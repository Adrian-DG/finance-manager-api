import { PartialType } from '@nestjs/swagger';
import { Account } from '../entities/account.entity';

export class UpdateAccount extends PartialType(Account) {}
