import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcrypt';

import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { Course } from 'src/courses/entities/course.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
    @InjectRepository(Course)
    private coursesRepository: Repository<Course>,
  ) {}
  async create(createUserDto: CreateUserDto) {
    const findUser = await this.findOneByUserName(createUserDto.username);
    if (findUser) {
      return {
        message: 'User already exists',
        success: false,
      };
    }
    createUserDto.password = await bcrypt.hash(createUserDto.password, 10);
    const user = this.usersRepository.create(createUserDto);
    this.usersRepository.save(user);
    return {
      message: 'User created successfully',
      success: true,
    };
  }

  async suscriptionCourse(id: number, courses: Array<number>) {
    const user = await this.findOne(id);
    if (!user) {
      return {
        message: 'User not found',
        success: false,
      };
    }

    const oldCuourses = user.courses;

    const _newUser = user;
    const findCourses = await this.coursesRepository.findByIds(courses);
    _newUser.courses = findCourses;
    _newUser.courses.push(...oldCuourses);

    const userUpdated = await this.usersRepository.save({
      ...user,
      ..._newUser,
    });
    return {
      message: 'User updated successfully',
      success: true,
      user: userUpdated,
    };
  }

  async unSuscriptionCourse(id: number, course: number) {
    const user = await this.findOne(id);
    if (!user) {
      return {
        message: 'User not found',
        success: false,
      };
    }

    const oldCuourses = user.courses;

    const _newUser = user;
    // const findCourse = await this.coursesRepository.findOneById(course);
    _newUser.courses = oldCuourses.filter((c) => c.id !== course);

    const userUpdated = await this.usersRepository.save({
      ...user,
      ..._newUser,
    });
    return {
      message: 'User updated successfully',
      success: true,
      user: userUpdated,
    };
  }

  // findAll() {
  //   return `This action returns all users`;
  // }

  findOne(id: number) {
    return this.usersRepository.findOne({
      where: { id },
      relations: ['courses'],
    });
  }
  findOneByUserName(username: string) {
    return this.usersRepository.findOneBy({ username });
  }

  // update(id: number, updateUserDto: UpdateUserDto) {
  //   return `This action updates a #${id} user`;
  // }

  // remove(id: number) {
  //   return `This action removes a #${id} user`;
  // }
}
