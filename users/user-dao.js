import mongoose from "mongoose";
import userModel from "./user-model.js";
export  function findOne(userId){
    return  userModel.findOne({"username":userId}).lean().exec()
}
export  function updateOne(user,userUpdated){
    const obj =  userModel.updateOne({username: user.username}, {$set: userUpdated});
    console.log(obj)
    return obj
}