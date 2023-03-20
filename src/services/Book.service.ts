import repositoryBook from "../repository/Book.repository"
import { InputBook_Payload } from "../helpers/DTO/dto"
import { BooksAttributes } from "../db/models/Books"

class ServiceBook {
    insert = async (bookData: InputBook_Payload) => {
        const result = await repositoryBook.insert(bookData)
        return result

    }
    getAll = async ():Promise<BooksAttributes[]> => {
        const result = await repositoryBook.getAll()
        if (!result) {
            return result
        }
        return result

    }
    getById = async (id: number):Promise<BooksAttributes> => {
        const result = await repositoryBook.findById(id)
        if(!result){
            throw Error('')
        }
        return result

    }
    update = async (id: number, data:object):Promise<object> => {
        const check = await repositoryBook.findById(id)
        if (!check) {
            throw Error('')
        }
        // return data
        await repositoryBook.update(id, data)
        return data

    }
    delete = async (id: number):Promise<BooksAttributes> => {
        const result = await repositoryBook.findById(id)
        if (!result) {
            throw Error('')
        }
        await repositoryBook.delete(id)
        return result
    }
}


export default new ServiceBook()