import { usermodel } from "../../db/models/usermodel.js"

export const createuser = async (data)=>{
    const user1  = await usermodel.findOne({email:data.email})
    if(user1){
        return {msg:"user exists"}
    }
    const user = await usermodel.create(
    {
        name:data.name,
        email : data.email,
        password : data.password,
        phone: data.phone,
        age :data.age
    }
    )
    return{data}
}

export const login  = async (data1)=>{
    const data = await usermodel.findOne({email:data1.email,password:data1.password})
    if(data){
    return{ok:`welcome , ${data.name}`}
    }
    else{
        return {
            err:"password or email is invalid"
        }
    }
}


export const update = async (id,data)=>{
const findall= await usermodel.find().select("email")
const found = await usermodel.findById(id)
if(!found){
    return {msg:"user not found"}
}
const filter = findall.filter((ele)=>{
    return data.email==ele.email && data.email!==found.email
})
if(filter.length){
    return {msg:"user exists"}
}
if(!filter.length){
    const data1 = await found.updateOne({
        name:data.name,
        email:data.email,
        age :data.age
    })
    return {data1}
}
}


export const del = async (id)=>{
    const data = await usermodel.findByIdAndDelete(id)
    if(!data){
        return {
            msg:"user not found"
        }
    }
    return {data}
}

export const getbyid = async (id)=>{
    const data = await usermodel.findById(id)
    if(data){
        return data
    }
    else{
        return {msg:"user not found "}
    }
}