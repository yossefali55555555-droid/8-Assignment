import { Router } from "express";
import * as all from "./service.js";
import { notemodel } from "../../db/models/notes.js";
import { success } from "../../utils/successresponse.js";
const noterouter = Router()
export const notesroutes = {base:"/notes",create:"/create",update:"/update/:id",replace:"/replace/:id",many:"/many",delete:"/delete/:id",paginate:"/paginate/:userid",get:"/get/:id"}
noterouter.post(notesroutes.create,async(req,res)=>{
    const {id}=req.query
    const body = req.body
    const data = await all.createnote(id,body)
    success({res,status:200,data})
})

noterouter.patch(notesroutes.update,async(req,res)=>{
    const {id} = req.params
    const body = req.body
    const {userid} =req.query
    const data = await all.updatenote(id,userid,body)
    success({res,status:200,data})
})

noterouter.patch(notesroutes.replace,async(req,res)=>{
    const {id} = req.params
    const body = req.body
    const {userid} =req.query
    const data = await all.updatenote(id,userid,body)
    success({res,status:200,data})
})

noterouter.patch(notesroutes.many,async(req,res)=>{
    const {userid} =req.query
    const body = req.body
    const data = await all.updatemany(body,userid)
    success({res,status:200,data  })
})

noterouter.delete(notesroutes.delete,async(req,res)=>{
    const {id} = req.params
    const body = req.body
    const {userid} =req.query
    const data = await all.deletenote(id,userid,body)
    success({res,status:200,data})
})

noterouter.get(notesroutes.paginate,async(req,res)=>{
    const {page} =req.query
    const {limit}=req.query
    const offset = (page - 1) * limit;
    const {userid} =req.params
    const data = await all.paginte(offset,limit,userid)
    success({res,status:200,data})
})
noterouter.get(notesroutes.get,async(req,res)=>{
        const {id}=req.params
        const {userid}=req.query
        const data = await all.getnote(id,userid)     
        success({res,status:200,data})
})
export default noterouter