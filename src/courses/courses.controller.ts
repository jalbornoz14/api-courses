import { Controller, Get, Post, Body, Param, Delete } from '@nestjs/common';
import { Put } from '@nestjs/common/decorators';
import { CoursesService } from './courses.service';
import { CalificationCourseDto } from './dto/calification.dto';
import { CreateCourseDto } from './dto/create-course.dto';
import { UpdateCourseDto } from './dto/update-course.dto';

@Controller('courses')
export class CoursesController {
  constructor(private readonly coursesService: CoursesService) {}

  @Post()
  create(@Body() course: CreateCourseDto) {
    return this.coursesService.create(course);
  }

  @Post('califiacation')
  createNewCalification(@Body() calificationCourse: CalificationCourseDto) {
    return this.coursesService.createNewCalification(calificationCourse);
  }

  @Get()
  findAll() {
    return this.coursesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.coursesService.findOne(+id);
  }

  @Get(':id/user/:userId')
  findCoursesByUser(@Param('id') id: string, @Param('userId') userId: string) {
    return this.coursesService.findCoursesByUser(+id, +userId);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updateCourseDto: UpdateCourseDto) {
    return this.coursesService.update(+id, updateCourseDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.coursesService.remove(+id);
  }
}
