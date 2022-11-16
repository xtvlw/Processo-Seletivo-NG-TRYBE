import { access } from "fs";
import { Entity, PrimaryColumn, Column, OneToOne, JoinColumn, OneToMany } from "typeorm";
import { Transactions } from "./Transactions";
import { Users } from "./users";

@Entity()
export class Account {
  
  @OneToOne(() => Users, accId => accId.accountId)
  @JoinColumn()
  @OneToMany(() => Users, accountId => accountId.id)
  accountId: Users[]

  @Column()
  balance: number;
}
