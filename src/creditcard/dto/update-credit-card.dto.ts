import { PartialType } from '@nestjs/mapped-types';
import { CreateCreditCard } from './create-credit-card.dto';

export class UpdateCreditCard extends PartialType(CreateCreditCard) {}
