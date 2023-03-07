import { Request } from "express"
import rBook from "../repository/Book.repository"
import Helper from "../helpers/Helper"

class ServiceBook {
    body: Request['body']
    params: Request['params']
    constructor(req: Request) {
        this.body = req.body
        this.params = req.params
    }
    insert = async () => {
        try {
            const { title, author, publisher, year, price, quantity, active } = this.body
            const data = {
                title,
                author,
                publisher,
                year,
                price,
                quantity,
                active
            }
            const insert = await rBook.Insert(data)
            return Helper.ResponseData("Insert Successs", null, insert)

        } catch (error: any) {
            return Helper.ResponseData("Error", null, error)
        }
    }
    getAll =async () => {
        try {
            const data = await rBook.GetAll()
            if(!data){
                return  Helper.ResponseData("no data", null, null)
            }
            return data
            // return Helper.ResponseData("Show All Book", null, data)
        } catch (error:any) {
            return  Helper.ResponseData("Error", null, error)
        }
    }
    getById =async () => {
        try {
            const {id} = this.params
            const data = await rBook.GetById(id)

            return  Helper.ResponseData("book : "+id, null, data)

        } catch (error:any) {
            return  Helper.ResponseData("Error", null, error)
        }
    }
    update =async () => {
        try {
            const {id} = this.params
            const { title, author, publisher, year, price, quantity, active } = this.body
            const data = {
                title,
                author,
                publisher,
                year,
                price,
                quantity,
                active
            }
            const check = await rBook.GetById(id)
            if(!check){
                return  Helper.ResponseData("Error id not found", null, check)
            }
            // return data
            const update = await rBook.Update(id,data)
            return Helper.ResponseData("Update Success", null, data)
            // return Helper.ResponseData("Show All Book", null, data)
        } catch (error:any) {
            return  Helper.ResponseData("Error", null, error)
        }
    }
    delete = async()=>{
        try {
            const {id}= this.params
            const check = await rBook.GetById(id)
            if(!check){
                return  Helper.ResponseData("Error id not found", null, check)
            }
            const del = await rBook.Delete(id)
            return Helper.ResponseData("delete success", null, check)
        } catch (error) {
            return  Helper.ResponseData("Error", null, error)
        }
        

    }
}

export default ServiceBook