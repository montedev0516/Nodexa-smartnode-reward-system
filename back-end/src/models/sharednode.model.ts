import mongoose from "mongoose";
import { sharednodeType } from "../types/sharednode.type";

const sharenodeSchema = new mongoose.Schema<sharednodeType>(
  {
    title: {
      type: String,
      trim: true,
    },
    alias: {
      type: String,
      trim: true,
    },
    description: {
      type: String,
      trim: true,
    },
    users: {
      type: [],
      trim: true,
    },
    version: {
      type: String,
      trim: true,
    },
    nodeAddress: {
      type: String,
      trim: true,
    },
    coinType: {
      type: String,
      trim: true,
    },
    period: {
      type: String,
      trim: true,
    },
    rewards: {
      type: Number,
      trim: true,
    },

    status: {
      type: String,
      trim: true,
    },
    funds: {
      type: Number,
      trim: true,
    },
    
    lastPaidAt: {
      type: Date,
      trim: true,
    },
    nextPaidDate: {
      type: Date,
      trim: true,
    },
    startedAt: {
      type: Date,
      trim: true,
    },
    expireDate: {
      type: Date,
      trim: true,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("SharedNodes", sharenodeSchema);
