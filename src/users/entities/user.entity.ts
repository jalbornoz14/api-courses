import { Course } from 'src/courses/entities/course.entity';
import { Profile } from 'src/profile/entities/profile.entity';
import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity({ name: 'users' })
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  username: string;

  @Column()
  password: string;

  @ManyToOne((type) => Profile, (profile) => profile.users)
  profile: Profile;

  @ManyToMany((type) => Course, (course) => course.user, { eager: true })
  @JoinTable({
    name: 'user_course',
    joinColumn: {
      name: 'user_id',
      referencedColumnName: 'id',
    },
    inverseJoinColumn: {
      name: 'course_id',
      referencedColumnName: 'id',
    }
  })
  courses: Course[];
}
