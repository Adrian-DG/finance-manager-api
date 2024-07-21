import { ApiProperty } from '@nestjs/swagger';

export class PaginationFilter {
  @ApiProperty()
  page: number;

  @ApiProperty()
  size: number;

  @ApiProperty({ nullable: true })
  searchTerm?: string;
}
