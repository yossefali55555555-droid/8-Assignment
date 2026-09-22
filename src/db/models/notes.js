import { ObjectId } from "bson";
import mongoose, { model,Schema } from "mongoose";
const notessch = new Schema ({
    title :{ type:String,required:true,
        validate:{
            validator: function(title){
                return title !== title.toUpperCase()
            },
            msg:"invalid should be the first and last only upper"
        }
    },
    content:{
        type : String,
        required:true
    }
    ,userId:{
        type:mongoose.Types.ObjectId,
        ref:"users"
    }
},{timestamps:true})
export const notemodel = model("notes",notessch)