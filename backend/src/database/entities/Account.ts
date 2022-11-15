import { Entity, PrimaryColumn, Column } from "typeorm";

@Entity()
export class Account {
  @PrimaryColumn()
  id: number = 0;

  @Column()
  balance: number = 100;
}
