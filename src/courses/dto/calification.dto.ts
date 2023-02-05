import { IsNumber, } from 'class-validator';

export class CalificationCourseDto {
  @IsNumber()
  calification: number;

  @IsNumber()
  idUser: number;

  @IsNumber()
  idCourse: number;
}
