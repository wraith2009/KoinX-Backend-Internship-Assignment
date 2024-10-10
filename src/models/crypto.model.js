import mongoose, { Schema } from "mongoose";

const cryptoSchema = new Schema(
  {
    coin: { type: String, required: true },
    price: { type: Number, required: true },
    marketCap: { type: Number, required: true },
    change24h: { type: Number, required: true },
  },
  {
    timestamps: true,
  }
);

export const Crypto = mongoose.model("Crypto", cryptoSchema);
