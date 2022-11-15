import { DataSource } from "typeorm";
import { Account } from "./entities/Account";
import { Transactions } from "./entities/Transactions";
import { Users } from "./entities/users";

const source = new DataSource({
  type: "postgres",
  host: "localhost",
  port: 5432,
  username: "postgres",
  password: "admin",
  database: "ng_data",
  entities: [Users, Account, Transactions],
  synchronize: true,
});
export default source;
