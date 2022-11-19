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
const tables = () => {
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
  client.query(`CREATE TABLE IF NOT EXISTS transaction (
    id varchar(255) NOT NULL UNIQUE,
    debitedAccountId varchar(255) NOT NULL,
    creditedAccountID varchar(255) NOT NULL,
    value int NOT NULL,
    createdAt TIMESTAMPTZ DEFAULT Now() ,
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
  // create user, it's insert into users and accounts; requires username and password
  createUser = async (config: createType): Promise<boolean> => {
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
      return false;
    }
    return true;
  };
  makeTransaction = async (info: Trasaction):Promise<boolean> => {
    let id = uuid();
    
    try {
      await client.query(
        `INSERT INTO transactions ()`
      )
    } catch {
      return false
    }
    return true
  };
}

export default execute;
