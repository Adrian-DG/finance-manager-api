import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
  Query,
  Req,
} from '@nestjs/common';
import { IncomeService } from '../service/income.service';
import { ApiBody, ApiParam, ApiQuery, ApiTags } from '@nestjs/swagger';
import { PaginationFilter } from 'src/shared/dto/pagination-filter.dto';
import { CreateIncome } from '../dto/create-income.dto';
import { UpdateIncome } from '../dto/update-income.dto';
import { UnAppliedAmmount } from 'src/shared/dto/applied-ammount.dto';

@ApiTags('Incomes')
@Controller('incomes')
export class IncomeController {
  constructor(private readonly incomeService: IncomeService) {}

  @Post()
  @ApiBody({ type: () => CreateIncome })
  async create(@Body() createAccount: CreateIncome, @Req() req) {
    const result = await this.incomeService.create(
      createAccount,
      req?.user?.sub as number,
    );
    return result;
  }

  @Get('stats')
  async findAllIncomesByAccount(@Req() req) {
    const result = await this.incomeService.findAllIncomesByAccount(
      req?.user?.sub as number,
    );
    return result;
  }

  @Get()
  async findAll(@Query() filters: PaginationFilter) {
    const result = await this.incomeService.findAll(filters);
    return result;
  }

  @Get(':id')
  @ApiParam({ name: 'id', type: Number })
  async findOne(@Param('id', new ParseIntPipe()) id: number) {
    const result = await this.incomeService.findOne(id);
    return result;
  }

  @Put(':id')
  @ApiParam({ name: 'id', type: Number })
  @ApiBody({ type: () => UpdateIncome })
  async update(
    @Param('id', new ParseIntPipe()) id: number,
    @Body() updateAccount: UpdateIncome,
  ) {
    const result = await this.incomeService.update(id, updateAccount);
    return result;
  }

  @Delete(':id')
  @ApiParam({ name: 'id', type: Number })
  async delete(@Param('id', new ParseIntPipe()) id: number) {
    const result = await this.incomeService.delete(id);
    return result;
  }

  @Put(':id/apply-income-to-account')
  @ApiParam({ name: 'id', type: Number, required: true })
  async applyIncomeToAccount(
    @Param(new ParseIntPipe()) id: number,
    @Body() UnAppliedAmmount: UnAppliedAmmount,
  ) {
    const result = await this.incomeService.applyIncomeToAccount(
      id,
      UnAppliedAmmount.ammount,
    );
    return result;
  }
}
