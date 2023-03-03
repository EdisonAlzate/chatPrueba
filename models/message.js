import mongoose from "mongoose";

let Schema=mongoose.Schema

let schemaMessage=new Schema({
    message:String,
    from:String
})

export default mongoose.model('Message',schemaMessage)