import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany } from "typeorm";
import { Account } from "./Account";

@Entity()
export class Transactions {
  @PrimaryGeneratedColumn()
  id: number = 0;

  @ManyToOne(() => Account, debitedAccountId => debitedAccountId.accountId)
  debitedAccountId: Account

  @ManyToOne(() => Account, creditedAccountId => creditedAccountId.accountId)
  creditedAccountId: Account

  @Column()
  value: number = 0;

  @Column()
  createdAt: Date = new Date();
}
