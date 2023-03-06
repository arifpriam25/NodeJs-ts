import mBook from "../db/models/Books";

class RepositoryBook {
    public static GetById = async (id: string) => {
        const data = await mBook.findByPk(id);
        return data
    }
    public static GetAll = async () => {
        const data = await mBook.findAll({
            where: {
                active: true
            }
        });
        return data
    }
    public static insert = async (data:any) => {
        const insert = await mBook.create(data);

        return insert
    }
    public static Update = async (id: string,data:any) => {
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