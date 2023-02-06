import { User } from 'src/users/entities/user.entity';
import { PrimaryGeneratedColumn, Column, Entity, ManyToMany } from 'typeorm';

@Entity({ name: 'courses' })
export class Course {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  description: string;

  @Column()
  img: string;

  @Column()
  autor: string;

  @Column({ select: false })
  idUser: number;

  @ManyToMany((type) => User, (user) => user.courses)
  user: User;

  califications: number;
  promediun: number;
  calificationByUser: number;
}
