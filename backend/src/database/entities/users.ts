import { Entity, PrimaryGeneratedColumn, Column, OneToOne } from "typeorm";
import { Account } from "./Account";

@Entity()
export class Users {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  username: string;

  @Column()
  password: string;

  @OneToOne(() => Account, accountId => accountId.accountId)
  accountId: Account;
}
