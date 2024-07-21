import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Query,
} from '@nestjs/common';
import { ApiBody, ApiParam, ApiQuery, ApiTags } from '@nestjs/swagger';
import { AccountService } from '../service/account.service';
import { CreateAccount } from '../dto/create-account.dto';
import { PaginationFilter } from 'src/shared/dto/pagination-filter.dto';

@ApiTags('Accounts')
@Controller('accounts')
export class AccountController {
  constructor(private readonly accountService: AccountService) {}

  @Post()
  @ApiBody({ type: () => CreateAccount })
  async create(@Body() createAccount: CreateAccount) {
    const result = await this.accountService.create(createAccount);
    return result;
  }

  @Get()
  @ApiQuery({ type: PaginationFilter })
  async findAll(@Query() filter: PaginationFilter) {
    const result = await this.accountService.findAll(filter);
    return result;
  }

  @Get(':id')
  @ApiParam({ name: 'id', type: Number })
  async findOne(@Param('id', new ParseIntPipe()) id: number) {
    const result = await this.accountService.findOne(id);
    return result;
  }
}
