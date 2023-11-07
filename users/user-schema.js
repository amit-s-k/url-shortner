import mongoose from "mongoose";

const userSchema = mongoose.Schema({
                                       username: String,
                                       tier: { type: Number, default: 1 },
                                       requestCount: { type: Number, default: 0 },
                                   },{collection:"users"})
export  default userSchema;