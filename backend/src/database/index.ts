import { Pool, Client } from "pg";
import { v4 as uuid } from "uuid";
import { createType, loginType, Trasaction, getAllTypes } from "./interfaces";
import tables from "./tables";
import hash from "../modules/hash";

// client config, presetting the values to access the database
export const client = new Client({
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

// create table users (if not exists it just ignore)
tables();

// interfaces for the methods from class execute

class execute {
  // get the balance from some account; requires the id of the acccount
  private getBalance = async (id: string): Promise<number> => {
    let balance = await client.query(
      `SELECT balance FROM accounts
      WHERE (id='${id}')`
    );
    return balance.rows[0].balance;
  };
  // this method get the accountID or the username, depends of what you want
  private getIds = async (username: string, accId: string): Promise<string> => {
    if (accId === "") {
      try {
        let accounId = await client.query(
          `SELECT accid FROM users WHERE (username='${username}')`
        );
        return await accounId.rows[0].accid;
      } catch {
        return "{status: 'failed', reason:'username don't exist'}";
      }
    } else {
      try {
        let user = await client.query(
          `SELECT username from users WHERE (accid='${accId}')`
        );
        return await user.rows[0].username;
      } catch {
        return "error";
      }
    }
  };

  // get all user transactions, requires the accountid
  private getAllTransactions = async (id: string): Promise<object[]> => {
    let transfers = await client.query(
      `SELECT * FROM transactions WHERE (debited_account_id='${id}' OR credited_account_id='${id}');`
    );
    let newTransfer: any[] = [];
    for (let row in transfers.rows) {
      let rowContent = transfers.rows[row];
      rowContent.fromUser = await this.getIds(
        "",
        rowContent.debited_account_id
      );
      rowContent.toUser = await this.getIds("", rowContent.credited_account_id);
      newTransfer.push(rowContent);
    }
    return newTransfer;
  };

  private passMatch = async (id: string, pass: string): Promise<boolean> => {
    try {
      let result = await client.query(
        `SELECT password FROM users WHERE (accid='${id}')`
      );
      let password = await result.rows[0].passsword;
      if (pass == password) {
        return true;
      } else {
        return false;
      }
    } catch {
      return false;
    }
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
        '${hash(config.password)}',
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
    return { status: "success", username: config.username };
  };

  // login
  login = async (config: loginType): Promise<number> => {
    try {
      // get user passsword from database
      let user = await client.query(
        `SELECT password FROM users WHERE (username='${config.username}')`
      );
      // verify if password math
      if (user.rows[0].password == hash(config.password)) {
        //return if password match
        return 0;
      } else {
        // return if password don't match
        return 401;
      }
    } catch (err) {
      // if user don't exist will return this
      return 404;
    }
  };

  // register a new transaction into the database; also change balence from accoun table
  makeTransaction = async (info: Trasaction): Promise<object> => {
    let id = uuid();

    let fromUser = await this.getIds(info.fromUser, "");
    let toUser = await this.getIds(info.toUser, "");

    if (await this.passMatch(fromUser, hash(info.password))) {
      return { status: "failed", reason: "password don't match" };
    }

    // if user try send to himself
    if (fromUser == toUser) {
      return { status: "failed", reason: "you can't sand money to yourself" };
    }

    // try insert the
    try {
      // variables to store user's new balance
      let fromUserNewBalaance = (await this.getBalance(fromUser)) - info.value;
      let toUserNewBalance = (await this.getBalance(toUser)) + info.value;

      // if user balance is less than 0, don't do the transfer
      if (fromUserNewBalaance >= 0) {
        // debite the value from the user account
        await client.query(
          `UPDATE accounts SET balance=${fromUserNewBalaance} WHERE (id='${fromUser}')`
        );

        // credit the value into the user account (send to the reciver)
        await client.query(
          `UPDATE accounts SET balance=${toUserNewBalance} WHERE (id='${toUser}')`
        );

        // insert the transfer detail into transaction table
        await client.query(
          `INSERT INTO transactions (id, debited_account_id, credited_account_id, value)
        VALUES (
          '${id}',
          '${fromUser}',
          '${toUser}',
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
