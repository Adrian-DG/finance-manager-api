import { PartialType } from '@nestjs/swagger';
import { CreateAccount } from 'src/account/dto/create-account.dto';

export class UpdateIncome extends PartialType(CreateAccount) {}
