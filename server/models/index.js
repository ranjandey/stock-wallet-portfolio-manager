import { url } from "../config/db.config.js";
import mongoose from "mongoose";
import StockInfo from "../models/stockInfo.js";

mongoose.Promise = global.Promise;

mongoose.set("strictQuery", false);

const db = {};
db.mongoose = mongoose;
db.url = url;
db.stockInfo = StockInfo(mongoose);

export default db;
