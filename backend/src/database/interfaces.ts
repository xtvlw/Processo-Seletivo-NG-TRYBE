export interface createType {
  username: string;
  password: string;
}
export interface loginType {
  username: string;
  password: string;
}
export interface Trasaction {
  id: string;
  fromUser: string;
  toUser: string;
  value: number;
  password: string;
}
export interface getAllTypes {
  id: string;
  username: string;
  accid: string;
  balance: number;
  transactions: object;
}
