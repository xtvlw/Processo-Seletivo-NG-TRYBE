import { DataSource } from "typeorm";
import { Account } from "./entities/Account";
import { Transactions } from "./entities/Transactions";
import { Users } from "./entities/users";
import { v4 as uuid } from "uuid";

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
source.initialize().then(() => console.log("database is running"));

interface userTypes {
  username: string;
  password: string;
  accId: string;
  id: string;
}

export const createUser = (data: userTypes): boolean => {
  let accId = uuid();
  // to new user
  const newUser = new Users();
  newUser.username = data.username;
  newUser.password = data.password;
  newUser.accId = accId;
  newUser.id = uuid();
  source.manager.save(newUser);
  // to new account
  const newAccount = new Account();
  newAccount.balance = 100;
  newAccount.id = accId;
  source.manager.save(newAccount);

  return true;
};
