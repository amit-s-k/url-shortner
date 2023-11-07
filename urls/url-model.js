import mongoose from "mongoose";
import urlSchema from "./url-schema.js";
const urlModel = mongoose.model('Url', urlSchema);
export default urlModel;
