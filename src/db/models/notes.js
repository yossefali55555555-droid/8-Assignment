import { ObjectId } from "bson";
import mongoose, { model,Schema } from "mongoose";
const notessch = new Schema ({
    title :{ type:String,required:true,
        validate:{
            validator: function(title){
                return title !== title.toUpperCase()
            },
            message: "Title cannot be entirely uppercase"
        }
    },
    content:{
        type : String,
        required:true
    }
    ,userId:{
        type:mongoose.Types.ObjectId,
        ref:"users",required: true
    }
},{timestamps:true})
export const notemodel = model("notes",notessch)