import { client } from "./index";

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

export default tables;