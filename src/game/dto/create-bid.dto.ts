import { IsInt, Min } from 'class-validator';

export class CreateBidDto {
  @IsInt()
  moveIndex: number;

  @IsInt()
  @Min(1)
  amount: number;
}
