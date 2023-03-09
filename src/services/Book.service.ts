import rBook from "../repository/Book.repository"
import Helper from "../helpers/Helper"

class ServiceBook {
    // body: Request['body']
    // params: Request['params']
    // constructor(req: Request) {
    //     this.body = req.body
    //     this.params = req.params
    // }
    insert = async ( title:string, author:string, publisher:string, year:number, price:number, quantity:number, active:boolean ) => {
        try {
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
    getById =async (id:string) => {
        try {
            const data = await rBook.findById(id)

            return  Helper.ResponseData("book : "+id, null, data)

        } catch (error:any) {
            return  Helper.ResponseData("Error", null, error)
        }
    }
    update =async (id:string, title:string, author:string, publisher:string, year:number, price:number, quantity:number, active:boolean ) => {
        try {
            const data = {
                title,
                author,
                publisher,
                year,
                price,
                quantity,
                active
            }
            const check = await rBook.findById(id)
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
    delete = async(id:string)=>{
        try {
            const check = await rBook.findById(id)
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

// export default ServiceBook
export default new ServiceBook()