import { Types } from "mongoose";
export type sharednodeType = {
  id?: Types.ObjectId;
  vps_id: Types.ObjectId;

  title: string;
  alias: string;
  description: string;
  version: string;
  nodeAddress: string;
  coinType: string;
  period: string;
  rewards: bigint;
  users: any[];

  status: string;
  funds: bigint;
  
  lastPaidAt: Date;
  nextPaidDate: Date;
  startedAt:Date;
  expireDate:Date;

  createdAt?: Date;
  updatedAt?: Date;
  __v?: number;
};
