import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity()
export class Transactions {
  @PrimaryGeneratedColumn()
  id: number = 0;

  @Column()
  debitedAccountId: string = "";

  @Column()
  creditedAccountId: string = "";

  @Column()
  value: number = 0;

  @Column()
  createdAt: Date = new Date();
}
