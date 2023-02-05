import { Module } from '@nestjs/common';
import { CoursesService } from './courses.service';
import { CoursesController } from './courses.controller';
import { Course } from './entities/course.entity';
import { CalificationCourse } from './entities/calification-course.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([Course, CalificationCourse])],
  controllers: [CoursesController],
  providers: [CoursesService],
})
export class CoursesModule {}