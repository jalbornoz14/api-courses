import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CalificationCourseDto } from './dto/calification.dto';
import { CreateCourseDto } from './dto/create-course.dto';
import { UpdateCourseDto } from './dto/update-course.dto';
import { CalificationCourse } from './entities/calification-course.entity';
import { Course } from './entities/course.entity';

@Injectable()
export class CoursesService {
  constructor(
    @InjectRepository(Course)
    private coursesRepository: Repository<Course>,
    @InjectRepository(CalificationCourse)
    private calificationCourseRepository: Repository<CalificationCourse>,
  ) {}
  create(createCourseDto: CreateCourseDto) {
    const course = this.coursesRepository.create(createCourseDto);
    this.coursesRepository.save(course);
    return {
      message: 'Course created successfully',
      success: true,
    };
  }

  async createNewCalification(calificationCourse: CalificationCourseDto) {
    const findCalifitacion = await this.calificationCourseRepository.findOne({
      where: {
        idUser: calificationCourse.idUser,
        idCourse: calificationCourse.idCourse,
      },
    });
    if (findCalifitacion) {
      return {
        message: 'You already have a calification for this course',
        success: false,
      };
    }
    const calification = await this.calificationCourseRepository.create(
      calificationCourse,
    );
    await this.calificationCourseRepository.save(calification);
    return {
      message: 'Calification created successfully',
      success: true,
    };
  }

  async findAll() {
    const courses = await this.coursesRepository.find();
    if (!courses) {
      return {
        message: 'Courses not found',
        success: false,
      };
    }
    return courses;
  }

  async findOne(id: number) {
    const course = await this.coursesRepository.findOne({ where: { id } });
    if (!course) {
      return {
        message: 'Course not found',
        success: false,
      };
    }
    return course;
  }

  async update(id: number, updateCourseDto: UpdateCourseDto) {
    const findCourse = await this.findOne(id);
    if (!findCourse) {
      return {
        message: 'Course not found',
        success: false,
      };
    }

    this.coursesRepository.update(id, updateCourseDto);
    return {
      message: 'Course updated successfully',
      success: true,
    };
  }

  async remove(id: number) {
    const findCourse = await this.findOne(id);
    if (!findCourse) {
      return {
        message: 'Course not found',
        success: false,
      };
    }

    this.coursesRepository.delete(id);
    return {
      message: 'Course deleted successfully',
      success: true,
    };
  }
}
