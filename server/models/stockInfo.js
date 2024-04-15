import mongoose from "mongoose";

const stockSchema = mongoose.Schema({
  assetName: String,
  shares: String,
  avgPrice: String,
  latestTradePrice: String,
  investmentValue: String,
  currentValue: String,
  profitAndLoss: String,
  change: String,
});

stockSchema.method("toJSON", function () {
  const { __v, _id, ...object } = this.toObject();
  object.id = _id;
  return object;
});

const StockInfo = mongoose.model("StockInfo", stockSchema);

export default StockInfo;
