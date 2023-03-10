import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  UseGuards,
  Put,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @UseGuards(JwtAuthGuard)
  @Put('suscription/:id')
  suscriptionCourse(
    @Param('id') id: string,
    @Body('course') courses: Array<number>,
  ) {
    return this.usersService.suscriptionCourse(+id, courses);
  }

  @UseGuards(JwtAuthGuard)
  @Put('unSuscription/:id')
  unSuscriptionCourse(@Param('id') id: string, @Body('course') course: number) {
    return this.usersService.unSuscriptionCourse(+id, course);
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.usersService.findOne(+id);
  }
}
