import { Transactions } from "./entities/Transactions";
import { Users } from "./entities/users";
import source from "./index";

source.initialize().then(() => console.log("database online"));

interface TransferConfig {
    transferId: number,
    fromUser: number,
    toUser: number,
    value: number,
    date: Date
}

export class Database {
  private insertData(table: string, values: object) {
    try {
      source
        .createQueryBuilder()
        .insert()
        .into(table)
        .values([values])
        .execute();
      return { status: 200 };
    } catch (error) {
      return { status: 400 };
    }
  }
  public createUser(userConfig: object): number {
    try {
      this.insertData("Users", userConfig);
      this.insertData("Account", userConfig);
      return 200;
    } catch {
      return 400;
    }
  }
  public transfer(transferData: TransferConfig): number {
    try {   
        this.insertData("Transactions", transferData)
      return 200;
    } catch {
      return 400;
    }
  }
}
