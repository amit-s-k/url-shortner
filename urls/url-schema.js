import mongoose from "mongoose";

const urlSchema = mongoose.Schema({
                                      longUrl: String,
                                      shortUrl: String,
                                      userId: String,
                                      createdAt: { type: Date, default: Date.now },
                                  },{collection:"urls"})
export default urlSchema;