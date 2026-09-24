import { Router } from "express";
import * as all from "./service.js";
import { notemodel } from "../../db/models/notes.js";
import { success } from "../../utils/successresponse.js";
const noterouter = Router()
export const notesroutes = {base:"/notes",create:"/create",update:"/update/:id",replace:"/replace/:id",many:"/many",delete:"/delete/:id",paginate:"/paginate/:userid",get:"/get/:id",findbytitle:"/ftitle/:userid",noteWithUser:"/note-With-User",agg:"/agg/:userid",deletemany:"/delall/:userid"}
noterouter.post(notesroutes.create,async(req,res)=>{
    const {userid}=req.query
    const body = req.body
    const data = await all.createnote(userid,body)
    success({res,status:200,data})
})

noterouter.patch(notesroutes.update,async(req,res)=>{
    const {id} = req.params
    const body = req.body
    const {userid} =req.query
    const data = await all.updatenote(id,userid,body)
    success({res,status:200,data})
})

noterouter.put(notesroutes.replace,async(req,res)=>{
    const {id} = req.params
    const body = req.body
    const {userid} =req.query
    const data = await all.replace(id,userid,body)
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
    const {userid} =req.query
    const data = await all.deletenote(id,userid)
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
        const {userid} = req.query
        const data = await all.getnote(id,userid)     
        success({res,status:200,data})
})


noterouter.get(notesroutes.findbytitle,async(req,res)=>{
    const {userid}=req.params
    const {content}=req.query
    const data = await all.findbycontent(userid,content)
     success({res,status:200,data})
})

noterouter.get(notesroutes.noteWithUser,async(req,res)=>{
    const {userid}=req.query
    const data = await all.findall(userid)
     success({res,status:200,data})
})

noterouter.get(notesroutes.agg,async(req,res)=>{
    const {userid}=req.params
    const{title} =req.query
    const data = await all.agg(userid,title)
     success({res,status:200,data})
})

noterouter.delete(notesroutes.deletemany,async(req,res)=>{
    const {userid}=req.params
    const data = await all.deleteallfor(userid)
     success({res,status:200,data})
})
export default noterouter