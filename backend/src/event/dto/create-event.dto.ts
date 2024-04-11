import { Transform } from 'class-transformer';
import {
  IsDate,
  IsNumber,
  IsPositive,
  IsString,
  MinDate,
  MinLength,
} from 'class-validator';

export class CreateEventDto {
  @IsString()
  @MinLength(3)
  address: string;
  @IsDate()
  @Transform(({ value }) => new Date(value))
  @MinDate(new Date())
  startTime: Date;
  @IsNumber()
  @IsPositive()
  ability: number;
}
