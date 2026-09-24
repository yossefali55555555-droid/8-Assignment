import { notemodel } from "../../db/models/notes.js"
import mongoose from "mongoose";
export const createnote = async(id,data1)=>{
    const data = await notemodel.insertOne({
        content:data1.content,
        title:data1.title,
        userId:id
    })
    return data
}

export const updatenote = async(id,userId,data)=>{
    const find =await notemodel.findOne({_id:id})
    if(!find){
        return  {msg :"the note not found"}
    }
    if(userId==find.userId){
    const data1 = await notemodel.findByIdAndUpdate(id,{
        title:data.title,
        content :data.content
    },{returnDocument:"after"})
    return {data1}
}
else{
    return  {
        msg:"unauthorized"
    }
}

    
}

export const replace = async(id,userId,data)=>{
    const find =await notemodel.findOne({_id:id})
    if(!find){
        return {msg:"note not found"}
    }
    if(userId==find.userId){
    const data1 = await notemodel.findOneAndReplace( {_id: id},{
        title:data.title,
        content :data.content,
        userId:userId
    },{returnDocument:"after"})
    return {data1}
}
else{
    return  {
        msg:"unauthorized"
    }
}
}

export const updatemany = async (data,userid)=>{
    const data1 = await notemodel.updateMany({userId:userid},{title:data.title})
    return {data1}
}

export const deletenote = async(id,userId)=>{
    const find =await notemodel.findOne({_id:id,userId:userId})
    if(!find){
        return {msg:"note not found"}
    }
    if(userId==find.userId){
    const data1 = await notemodel.findByIdAndDelete({_id:id,userId:userId},{returnDocument:"after"})
    return {data1}
}
else{
    return  {
        msg:"unauthorized"
    }
} 
}

export const paginte = async(offset , limit,userid)=>{
    const data =await notemodel.find({userId:userid}).sort({createdAt:-1}).skip(offset).limit(limit)
    return{data}
}

export const getnote = async(noteid,ownerid)=>{

    const data = await notemodel.findOne({
        _id:noteid,
        userId:ownerid
    })

    if(!data){
        return {msg:"data not found"}
    }

    return {data}
}


export const findbycontent = async (userid,content)=>{
    const data = await notemodel.findOne({
        userId:userid,
        content : content
    })
    if(data){
    return {data}
    }
    if (!data){
        return {msg:"note not found"}
    }
}


export const findall= async (userid)=>{
    const data = await notemodel.find({userId:userid}).select("title userId createdAt").populate([{
        path:"userId",
        select:{
            _id:0,
            email:1
        }
    }])
    return{data}
}

export const agg= async(userid,title)=>{
    userid =new mongoose.Types.ObjectId(userid)
    const data = await notemodel.aggregate([
          {
            $match:{
                title:title,
                userId:userid
            }
        },  {
            $lookup:{
                from:"users",
                foreignField:"_id",
                localField:"userId",
                as:"User_Info"
            }
        },{
            $unwind:"$User_Info"
        },
        {
            $project:{
                _id:0,
                title:1,
                userId:1,
                createdAt:1,
                "User_Info.name":1,
                "User_Info.email":1
            }
        }
        
    ])
    return {data}
}

export const deleteallfor = async (userid)=>{
    const data = await notemodel.deleteMany({userId:userid})
    return{data}
}