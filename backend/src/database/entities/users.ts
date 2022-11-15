import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity()
export class Users {
  @PrimaryGeneratedColumn()
  id: number = 0;

  @Column()
  username: string = "";

  @Column()
  password: string = "";

  @Column({ unique: true })
  accountId: string = "";
}
