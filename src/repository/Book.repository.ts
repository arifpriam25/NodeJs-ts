import mBook from "../db/models/Books";

class RepositoryBook {
    public static findById = async (idBook: string)=> {
        const find = await mBook.findOne({
            where: {
                id: idBook
            }
        })
        // console.log(find)
        return find
    }
    
    public static GetAll = async () => {
        const data = await mBook.findAll({
            where: {
                active: true
            }
        });
        // console.log(data)
        return data
    }
    public static Insert = async (data: any) => {
        const insert = await mBook.create(data);

        return insert
    }
    public static Update = async (id: string, data: any) => {
        const update = await mBook.update(data, {
            where: {
                id: id
            }
        })
        return update
    }
    public static Delete = async (id: string) => {
        const del = await mBook.destroy({
            where: {
                id: id
            }
        });
        return del
    }
}
export default RepositoryBook