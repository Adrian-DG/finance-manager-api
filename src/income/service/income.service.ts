import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Income } from '../entities/income.entity';
import { DeleteResult, Like, Repository, UpdateResult } from 'typeorm';
import { CreateIncome } from '../dto/create-income.dto';
import { PaginationFilter } from 'src/shared/dto/pagination-filter.dto';
import { PagedData } from 'src/shared/models/paged-data.model';
import { UpdateIncome } from '../dto/update-income.dto';
import { Account } from 'src/account/entities/account.entity';
import { AccountService } from 'src/account/service/account.service';
import { IncomeDetail } from '../models/income-detail.model';

@Injectable()
export class IncomeService {
  constructor(
    @InjectRepository(Income) private readonly _incomes: Repository<Income>,
    private readonly _accounts: AccountService,
  ) {}

  async create(createIncome: CreateIncome): Promise<Income> {
    const foundAccount =
      createIncome.accountId > 0
        ? await this._accounts.findOne(createIncome.accountId)
        : null;
    const newIncome = await this._incomes.create({
      ...createIncome,
      account: foundAccount,
    });
    return this._incomes.save(newIncome);
  }

  async findAll(filters: PaginationFilter) {
    const [records, totalCount] = await this._incomes.findAndCount({
      where: { name: Like(`%${filters.searchTerm ?? ''}%`) },
      skip: (filters.page - 1) * filters.size,
      take: filters.size,
      relations: { account: true },
      select: {
        id: true,
        name: true,
        account: {
          id: true,
          name: true,
        },
      },
      order: { id: 'ASC' },
    });

    // const result = await this._incomes.manager.query<IncomeDetail>(`
    //   select
    //   i.id as incomeId,
    //   i.name as income,
    //   a.name as account
    //   from incomes as i
    //   left join accounts as a on a.id = i.accountId
    //   where i.name like '%${filters.searchTerm ?? ''}%'`);

    // return result;

    // const [records, total] = await this._incomes
    //   .createQueryBuilder('income')
    //   .leftJoin('income.account', 'account')
    //   .select(['income.id', 'income.name', 'account.id', 'account.name'])
    //   .skip((filters.page - 1) * filters.size)
    //   .take(filters.size)
    //   .getManyAndCount();

    return { ...filters, records, totalCount };
  }

  async findOne(id: number): Promise<Income> {
    const result = await this._incomes.findOneBy({ id });
    return result;
  }

  async update(id: number, updateIncome: UpdateIncome): Promise<UpdateResult> {
    return await this._incomes.update(id, updateIncome);
  }

  async delete(id: number): Promise<DeleteResult> {
    return await this._incomes.delete(id);
  }

  async findAllIncomesByAccount() {
    const result = await this._incomes.manager.query(`
      select
      a.name as income,
      count(i.id) as total from incomes as i
      inner join accounts as a on a.id = i.accountId
      group by a.name
      order by a.name asc
    `);

    return result;
  }
}
