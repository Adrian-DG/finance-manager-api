import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreditCard } from '../entities/credit-card.entity';
import { Repository } from 'typeorm';
import { CreateCreditCard } from '../dto/create-credit-card.dto';

@Injectable()
export class CreditCardService {
  constructor(
    @InjectRepository(CreditCard) private _credictCards: Repository<CreditCard>,
  ) {}

  async findAll() {
    return await this._credictCards.find({
      where: { status: true },
      order: { name: 'asc' },
    });
  }

  async create(model: CreateCreditCard) {
    const card = this._credictCards.create({
      ...model,
      availableAmmount: model.approvedAmmount,
    });
    return await this._credictCards.save(card);
  }

  async updateAvailableAmmount(id: number, ammount: number) {
    const foundCard = await this._credictCards.findOneBy({ id });
    foundCard.availableAmmount -= ammount;
    return await this._credictCards.save(foundCard);
  }
}
