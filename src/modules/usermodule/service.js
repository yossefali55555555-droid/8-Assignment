import { usermodel } from "../../db/models/usermodel.js"

export const createuser = async (data)=>{
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
    const all = await usermodel.find().select("email")
    const find= await usermodel.findById(id)
       if(!find){
        return {
            msg:"user not found"
        }
    }
    const filter = all.filter((ele)=>{
        return  ele.email===data.email})
    if(!filter.length){
        const data1 =await find.updateOne({
            name:data.name,
            email:data.email,
            phone:data.phone
        })
        return {data1}
    }
    if(filter.length){
        return{
            msg:"the email exists"
        }
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