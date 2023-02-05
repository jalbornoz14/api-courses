import { PrimaryGeneratedColumn, Column, Entity } from 'typeorm';

@Entity({ name: 'calification_courses' })
export class CalificationCourse {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    type: 'numeric',
    precision: 1,
  })
  calification: number;

  @Column()
  idUser: number;

  @Column()
  idCourse: number;
}
