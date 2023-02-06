import { IsString, IsNumber } from 'class-validator';

export class CreateCourseDto {
  @IsString()
  name: string;

  @IsString()
  description: string;

  @IsString()
  img: string;

  @IsString()
  autor: string;

  @IsNumber()
  idUser: number;
}
