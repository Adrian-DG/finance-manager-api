import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreditCard } from '../entities/credit-card.entity';
import { And, Equal, Repository } from 'typeorm';
import { CreateCreditCard } from '../dto/create-credit-card.dto';
import { UpdateCreditCard } from '../dto/update-credit-card.dto';

@Injectable()
export class CreditCardService {
  constructor(
    @InjectRepository(CreditCard) private _credictCards: Repository<CreditCard>,
  ) {}

  async findAll(userId: number) {
    return await this._credictCards.find({
      where: { status: true, userId: And(Equal(userId)) },
      order: { name: 'asc' },
      select: {
        id: true,
        name: true,
        approvedAmmount: true,
        availableAmmount: true,
        cutOffDate: true,
        dueDate: true,
      },
    });
  }

  async findById(id: number) {
    return await this._credictCards.findOne({
      where: { id },
      select: {
        id: true,
        name: true,
        approvedAmmount: true,
        cutOffDate: true,
        dueDate: true,
      },
    });
  }

  async create(model: CreateCreditCard, userId: number) {
    const card = this._credictCards.create({
      ...model,
      availableAmmount: model.approvedAmmount,
      userId: userId,
    });
    return await this._credictCards.save(card);
  }

  async update(id: number, model: UpdateCreditCard) {
    return await this._credictCards.update(id, model);
  }

  async delete(id: number) {
    return await this._credictCards.delete(id);
  }
}
