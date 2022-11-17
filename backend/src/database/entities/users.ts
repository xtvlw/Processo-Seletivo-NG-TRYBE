import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  Generated,
  PrimaryColumn,
} from "typeorm";

@Entity()
export class Users {
  @PrimaryColumn()
  id: string;

  @Column({ type: "varchar", unique: true })
  username: string;

  @Column()
  password: string;

  @Column({unique: true}) 
  accId: string; 
}
