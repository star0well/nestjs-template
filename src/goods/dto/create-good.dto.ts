import { Type } from 'class-transformer';
import { IsDate, IsNotEmpty, IsString, Length } from 'class-validator';

export class CreateGoodDto {
  @Length(0, 20)
  name: string;
  @Type(() => Date)
  @IsDate()
  activityTime: Date;

  @IsString()
  imgUrl: string;
}
