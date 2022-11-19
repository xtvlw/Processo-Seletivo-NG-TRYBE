import { Pool, Client } from "pg";
import { v4 as uuid } from "uuid";

const client = new Client({
  database: "ng_data",
  user: "postgres",
  password: "admin",
  port: 5432,
  host: "localhost",
});

client.connect((err) => {
  if (err) throw err;
  console.log("database is online");
});

const pool = new Pool();

// create all the tables
const tables = (): void => {
  client.query(`CREATE TABLE IF NOT EXISTS Users (
    id varchar(255) NOT NULL UNIQUE,
    username varchar(255) NOT NULL UNIQUE,
    password varchar(255) NOT NULL,
    accId varchar(255) NOT NULL UNIQUE,
    PRIMARY KEY (id)
  )`);
  client.query(`CREATE TABLE IF NOT EXISTS accounts (
    id varchar(255) NOT NULL UNIQUE,
    balance int,
    PRIMARY KEY (id)
  )`);
  client.query(`CREATE TABLE IF NOT EXISTS transactions (
    id varchar(255) NOT NULL UNIQUE,
    debited_account_id varchar(255) NOT NULL,
    credited_account_id varchar(255) NOT NULL,
    value int NOT NULL,
    created_at TIMESTAMPTZ DEFAULT Now() ,
    PRIMARY KEY (id)
  )`);
};
// create table users (if not exists it just ignore)
tables();

interface createType {
  username: string;
  password: string;
}
interface Trasaction {
  id: string;
  fromUser: string;
  toUser: string;
  value: number;
}
class execute {
  // get the balance from some account; requires the id of the acccount
  private getBalance = async (id: string): Promise<number> => {
    let balance = await client.query(
      `SELECT balance FROM accounts
      WHERE (id='${id}')`
    );
    return balance.rows[0].balance;
  };

  // create user, it's insert into users and accounts; requires username and password
  createUser = async (config: createType): Promise<object> => {
    let accId = uuid();
    // insert values into users
    try {
      await client.query(
        `INSERT INTO Users (id, username, password, accId) 
      VALUES (
        '${uuid()}',
        '${config.username}',
        '${config.password}',
        '${accId}'
        )`
      );

      await client.query(`
      INSERT INTO accounts (id, balance) 
      VALUES ('${accId}',
        100)`);
    } catch {
      return { status: "failed", reason: "username exists" };
    }
    return { status: "sucess" };
  };

  // register a new transaction into the database; also change balence from accoun table
  makeTransaction = async (info: Trasaction): Promise<object> => {
    let id = uuid();
    // try insert the
    try {
      // variables to store user's new balance
      let fromUserNewBalaance =
        (await this.getBalance(info.fromUser)) - info.value;
      let toUserNewBalance = (await this.getBalance(info.toUser)) + info.value;

      // if user balance is less than 0, don't do the transfer
      if (fromUserNewBalaance >= 0) {
        // debite the value from the user account
        await client.query(
          `UPDATE accounts SET balance=${fromUserNewBalaance} WHERE (id='${info.fromUser}')`
        );

        // credit the value into the user account (send to the reciver)
        await client.query(
          `UPDATE accounts SET balance=${toUserNewBalance} WHERE (id='${info.toUser}')`
        );

        // insert the transfer detail into transaction table
        await client.query(
          `INSERT INTO transactions (id, debited_account_id, credited_account_id, value)
        VALUES (
          '${id}',
          '${info.fromUser}',
          '${info.toUser}',
          ${info.value}
          )`
        );
      } else {
        // if debited user don't have balance to make the tranfer, the transfer will be denided
        return {
          status: "failed",
          reason: "user does not have balance to carry out the transfer",
        };
      }
    } catch (err) {
      // any error will return { status: "failed" } and won't make the transfer
      console.log(err);
      return { status: "failed" };
    }

    // if everthing goes good return { status: "success" } and update the user's balance
    return { status: "success" };
  };
}

export default execute;
