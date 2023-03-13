import mBook from "../db/models/Books";
import { BookData } from "../helpers/DTO/dto";

class RepositoryBook {
    findById = async (idBook: number)=> {
        const find = await mBook.findOne({
            where: {
                id: idBook
            }
        })
        // console.log(find)
        return find
    }
    
    getAll = async () => {
        const data = await mBook.findAll({
            where: {
                active: true
            }
        });
        // console.log(data)
        return data
    }
    insert = async (data: BookData) => {
        const insert = await mBook.create(data);

        return insert
    }
    update = async (id: number, data: object) => {
        const update = await mBook.update(data, {
            where: {
                id: id
            }
        })
        return update
    }
    delete = async (id: number) => {
        const del = await mBook.destroy({
            where: {
                id: id
            }
        });
        return del
    }
}
export default new RepositoryBook()