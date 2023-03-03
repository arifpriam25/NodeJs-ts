import { Request,Response } from "express";
import MasterMenu from "../db/models/MasterMenu";
import Helper from "../Helpers/Helper";


const CreateMenu = async(req:Request, res:Response):Promise<Response>=> {
    try {
        const { name,icon,ordering }=req.body;

        const menu = await MasterMenu.create({
            name,
            icon,
            ordering,
            active: true
        })

        return res.status(200).send(Helper.ResponseData(201,"Created",null,menu))
    } catch (error:any ) {
        return res.status(500).send(Helper.ResponseData(500," ",error,null))
    }
};

const GetListMenu = async(req:Request,res:Response):Promise<Response>=>{
    try {
        const menu = await MasterMenu.findAll({
            where:{
                active:true
            }
        })
        return res.status(200).send(Helper.ResponseData(200,"Ok", null,menu))
    } catch (error:any) {
        return res.status(500).send(Helper.ResponseData(500," ",error,null))
    }
}
const GetAllMenu = async(req:Request,res:Response):Promise<Response>=>{
    try {
        const menu = await MasterMenu.findAll()
        return res.status(200).send(Helper.ResponseData(200,"Ok", null,menu))
    } catch (error:any) {
        return res.status(500).send(Helper.ResponseData(500," ",error,null))
    }
}
const GetDetailMenu = async(req:Request,res:Response):Promise<Response>=>{
    try {
        const {id} = req.params
        const menu = await MasterMenu.findOne({
            where:{
                id:id,
                active:true
            }
        })
        if(!menu){
            return res.status(404).send(Helper.ResponseData(404,"Menu : NotFound", null,null))
        }
        return res.status(200).send(Helper.ResponseData(200,"Ok", null,menu))
    } catch (error:any) {
        return res.status(500).send(Helper.ResponseData(500," ",error,null))
    }
}


const UpdateMenu = async(req:Request,res:Response):Promise<Response>=>{
    try {
        const {id} = req.params;
        const {name,icon,ordering} = req.body;
        const menu = await MasterMenu.findOne({
            where:{
                id:id,
                active:true
            }
        })
        if(!menu){
            return res.status(404).send(Helper.ResponseData(404,"Menu : NotFound", null,null))
        }
        menu.name = name;
        menu.icon = icon;
        menu.ordering = ordering;

        await menu.save();

        return res.status(200).send(Helper.ResponseData(200,"Updated", null,null))
    } catch (error:any) {
        return res.status(500).send(Helper.ResponseData(500," ",error,null))
    }
}

const SoftDeleteMenu = async(req:Request,res:Response):Promise<Response>=>{
    try {
        const {id} = req.params
        const menu = await MasterMenu.findOne({
            where:{
                id:id,
                active:true
            }
        })
        if(!menu){
            return res.status(404).send(Helper.ResponseData(404,"Menu : NotFound", null,null))
        }
        menu.active = false;
        //  await MasterMenu.update()
        return res.status(200).send(Helper.ResponseData(200,"Ok", null,menu))
    } catch (error:any) {
        return res.status(500).send(Helper.ResponseData(500," ",error,null))
    }
}

const DeletePermanent=async(req:Request,res:Response):Promise<Response>=>{
    try {
        const {id} = req.params
        const menu = await MasterMenu.findOne({
            where:{
                id:id,
                active:true
            }
        })
        if(!menu){
            return res.status(404).send(Helper.ResponseData(404,"Menu : NotFound", null,null))
        }
        await menu.destroy()
        return res.status(200).send(Helper.ResponseData(200,"Ok", null,menu))
    } catch (error:any) {
        return res.status(500).send(Helper.ResponseData(500," ",error,null))
    }
}

export default { GetListMenu,CreateMenu,UpdateMenu,GetAllMenu,GetDetailMenu,SoftDeleteMenu,DeletePermanent}