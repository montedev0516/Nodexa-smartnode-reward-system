import { Types } from "mongoose";
export type vpsType = {
  id?: Types.ObjectId;
  title: string;
  description: string;
  systemType: string;
  ipAddress: string;
  period: string;
  price: bigint;
  
  lastPaidAt: Date;
  nextPaidDate: Date;

  createdAt?: Date;
  updatedAt?: Date;
  __v?: number;
};
