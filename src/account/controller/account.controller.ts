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
  Request,
} from '@nestjs/common';
import { ApiBody, ApiParam, ApiQuery, ApiTags } from '@nestjs/swagger';
import { AccountService } from '../service/account.service';
import { CreateAccount } from '../dto/create-account.dto';
import { PaginationFilter } from 'src/shared/dto/pagination-filter.dto';
import { UpdateAccount } from '../dto/update-account.dto';
import { UnAppliedAmmount } from 'src/shared/dto/applied-ammount.dto';
import { Public } from 'src/auth/strategy/public-access.strategy';

@ApiTags('Accounts')
@Controller('accounts')
export class AccountController {
  constructor(private readonly accountService: AccountService) {}

  @Post()
  @ApiBody({ type: () => CreateAccount })
  async create(@Body() createAccount: CreateAccount, @Request() req) {
    console.log(req?.user);
    const result = await this.accountService.create(
      createAccount,
      req?.user as number,
    );
    return result;
  }

  @Get()
  async findAll(@Query() filter: PaginationFilter, @Request() req) {
    const result = await this.accountService.findAll(
      filter,
      req?.user as number,
    );
    return result;
  }

  @Get(':id')
  @ApiParam({ name: 'id', type: Number })
  async findOne(@Param('id', new ParseIntPipe()) id: number) {
    const result = await this.accountService.findOne(id);
    return result;
  }

  @Put(':id')
  @ApiParam({ name: 'id', type: Number })
  @ApiBody({ type: () => UpdateAccount })
  async update(
    @Param('id', new ParseIntPipe()) id: number,
    @Body() updateAccount: UpdateAccount,
  ) {
    const result = await this.accountService.update(id, updateAccount);
    return result;
  }
}
