import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
  Query,
  Req,
} from '@nestjs/common';
import { ApiParam, ApiTags } from '@nestjs/swagger';
import { PaginationFilter } from 'src/shared/dto/pagination-filter.dto';
import { CreditCardService } from '../services/credit-card.service';
import { CreateCreditCard } from '../dto/create-credit-card.dto';
import { UpdateCreditCard } from '../dto/update-credit-card.dto';

@ApiTags('Credit-Cards')
@Controller('credit-card')
export class CreditCardController {
  constructor(private readonly _creditCardService: CreditCardService) {}

  @Get()
  async findAll(@Req() req) {
    const result = await this._creditCardService.findAll(
      req?.user?.sub as number,
    );
    return result;
  }

  @Get(':id')
  @ApiParam({ name: 'id', type: Number, required: true })
  async findById(@Param(new ParseIntPipe()) id: number) {
    const result = await this._creditCardService.findById(id);
    return result;
  }

  @Post()
  async create(@Body() model: CreateCreditCard, @Req() req) {
    const result = await this._creditCardService.create(
      model,
      req?.user?.sub as number,
    );
    return result;
  }

  @Put(':id')
  @ApiParam({ name: 'id', type: Number, required: true })
  async update(
    @Param(new ParseIntPipe()) id: number,
    @Body() model: UpdateCreditCard,
  ) {
    const result = await this._creditCardService.update(id, model);
    return result;
  }
}
