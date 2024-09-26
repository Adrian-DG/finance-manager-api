import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Account } from '../entities/account.entity';
import {
  And,
  DeleteResult,
  Equal,
  FindOptionsWhere,
  Like,
  Repository,
  UpdateResult,
} from 'typeorm';
import { CreateAccount } from '../dto/create-account.dto';
import { PaginationFilter } from 'src/shared/dto/pagination-filter.dto';
import { PagedData } from 'src/shared/models/paged-data.model';
import { UpdateAccount } from '../dto/update-account.dto';
import { IAccountDetail } from '../models/account-detail.model';

@Injectable()
export class AccountService {
  constructor(
    @InjectRepository(Account) private readonly _accounts: Repository<Account>,
  ) {}

  async create(createAccount: CreateAccount, userId: number): Promise<Account> {
    const newAccount = await this._accounts.create({
      name: createAccount.name,
      savedAmmount: createAccount.ammount,
      userId: userId,
    });
    return this._accounts.save(newAccount);
  }

  async findAll(
    filters: PaginationFilter,
    userId: number,
  ): Promise<PagedData<IAccountDetail>> {
    const [records, totalCount] = await this._accounts.findAndCount({
      where: {
        name: Like(`%${filters.searchTerm ?? ''}%`),
        //userId: And(Equal(userId)),
      },
      skip: (filters.page - 1) * filters.size,
      take: filters.size,
      select: { id: true, name: true, savedAmmount: true },
      order: { name: 'ASC' },
    });

    return {
      ...filters,
      records,
      totalCount,
    } as PagedData<IAccountDetail>;
  }

  async findOne(id: number): Promise<Account> {
    const result = await this._accounts.findOneBy({ id });
    return result;
  }

  async update(
    id: number,
    updateAccount: UpdateAccount,
  ): Promise<UpdateResult> {
    return await this._accounts.update(id, updateAccount);
  }

  async delete(id: number): Promise<DeleteResult> {
    return await this._accounts.delete(id);
  }

  async increaseSavingAmmount(id: number, ammount: number) {
    const foundAccount = await this._accounts.findOneBy({ id });
    foundAccount.savedAmmount += ammount;
    return this._accounts.update(id, foundAccount);
  }

  async decreaseSavingAmmount(id: number, ammount: number) {
    const foundAccount = await this._accounts.findOneBy({ id });
    foundAccount.savedAmmount -= ammount;
    return this._accounts.update(id, foundAccount);
  }
}
