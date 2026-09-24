import { Router } from "express";
import * as all from "./service.js";
import { usermodel } from "../../db/models/usermodel.js";
import { success } from "../../utils/successresponse.js";
const userrouter = Router()
export const routes = {base:"/user",get:"/get/:id",delete:"/del/",update:"/update/:id",create:"/create",login:"/login"}
userrouter.post(routes.create ,async(req,res)=>{
    const {body} =req
    const data = await all.createuser(body)
    success({res,status:200,data})
})
userrouter.post(routes.login ,async(req,res)=>{
    const {body} =req
    const data = await all.login(body)
    success({res,status:200,data})
})

userrouter.patch(routes.update, async (req,res)=>{
    const data = await all.update(req.params.id,req.body)
    success({res,status:200,data})
})

userrouter.delete (routes.delete,async(req,res)=>{
    const {userid} =req.query 
    const data =await all.del(userid)
    success({res,status:200,data})
})

userrouter.get (routes.get,async(req,res)=>{
    const {id} =req.params 
    const data =await all.getbyid(id)
    success({res,status:200,data})
})
export default userrouter