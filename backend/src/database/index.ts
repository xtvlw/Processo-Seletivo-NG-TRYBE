import { Pool, Client } from "pg";
import { v4 as uuid } from "uuid";

// client config, presetting the values to access the database
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

// create pool to run query's
const pool = new Pool();

// create all the tables
const tables = (): void => {
  // create table users and set to have columns (id, username, password, accId)
  client.query(`CREATE TABLE IF NOT EXISTS Users (
    id varchar(255) NOT NULL UNIQUE,
    username varchar(255) NOT NULL UNIQUE,
    password varchar(255) NOT NULL,
    accId varchar(255) NOT NULL UNIQUE,
    PRIMARY KEY (id)
  )`);

  // create table accounts and set to have columns (id, balance)
  // note that accounts[id] and user[accId] are the same (one-to-one)
  client.query(`CREATE TABLE IF NOT EXISTS accounts (
    id varchar(255) NOT NULL UNIQUE,
    balance int,
    PRIMARY KEY (id)
  )`);

  // create table transactions and set to have columns (id, debited_account_id, credited_account_id, value, created_at)
  // note that create that are auto increment
  // note: debited and credited columns are one-to-many of account[id]
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

// interfaces for the methods from class execute
interface createType {
  username: string;
  password: string;
}
interface loginType {
  username: string;
  password: string;
}
interface Trasaction {
  id: string;
  fromUser: string;
  toUser: string;
  value: number;
}
interface getAllTypes {
  id: string;
  username: string;
  accid: string;
  balance: number;
  transactions: object;
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

  // get all user transactions, requires the accountid
  private getAllTransactions = async (id: string): Promise<object[]> => {
    let transfers = await client.query(
      `SELECT * FROM transactions WHERE (debited_account_id='${id}' OR credited_account_id='${id}');`
    );
    return transfers.rows;
  };

  // create user, it's insert into users and accounts; requires username and password
  createUser = async (config: createType): Promise<object> => {
    let accId = uuid();
    // insert values into users
    try {
      // create user into table user with the values from config
      await client.query(
        `INSERT INTO Users (id, username, password, accId) 
      VALUES (
        '${uuid()}',
        '${config.username}',
        '${config.password}',
        '${accId}'
        )`
      );
      // Add balance and accounid to the table account for the user
      await client.query(`
      INSERT INTO accounts (id, balance) 
      VALUES ('${accId}',
        100)`);
    } catch {
      // if user already exists, return { status: "failed", reason: "username exists" }
      return { status: "failed", reason: "username exists" };
    }
    // if everthing goes good return { status: "sucess" }
    return { status: "sucess", username: config.username };
  };

  // login
  login = async (config: loginType): Promise<object> => {
    try {
      // get user passsword from database
      let user = await client.query(
        `SELECT password FROM users WHERE (username='${config.username}')`
      );
      // verify if password math
      if (user.rows[0].password == config.password) {
        //return if password match
        return { status: "sucess" };
      } else {
        // return if password don't match
        return { status: "failed", reason: "password don't match" };
      }
    } catch (err) {
      // if user don't exist will return this
      console.log(err);
      return { status: "failed", reason: "user don't have an account" };
    }
  };

  // register a new transaction into the database; also change balence from accoun table
  makeTransaction = async (info: Trasaction): Promise<object> => {
    let id = uuid();

    // if user try send to himself
    if (info.fromUser == info.toUser) {
      return { status: "failed", reason: "you can't sand money to yourself" };
    }

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

  // return all the user info, (id, accid, balance, username and transactions the the user make part)
  getAllData = async (username: string): Promise<object> => {
    // get user data, (username, id, accid)
    try {
      let userData = await client.query(
        `SELECT * from users WHERE (username='${username}');`
      );

      //get account information (accid, balance)
      let userAccount = await client.query(
        `SELECT * FROM accounts WHERE (id='${userData.rows[0].accid}')`
      );

      // get all transactions that the user make part
      let userTransactions: object = await this.getAllTransactions(
        userAccount.rows[0].id
      );

      // object with all user data, like (id, username, accountId, balance and the transactions)
      let result: getAllTypes = {
        id: userData.rows[0].id,
        username: userData.rows[0].username,
        accid: userAccount.rows[0].id,
        balance: userAccount.rows[0].balance,
        transactions: userTransactions,
      };
      // return an object with all user data
      return result;
    } catch (err) {
      // return error because user don't exists
      return { status: "failed", reason: "user don't exists" };
    }
  };
}

export default execute;
