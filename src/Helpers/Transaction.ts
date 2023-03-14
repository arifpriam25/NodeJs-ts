import { sequelize } from '../db/models';
import { Transaction } from "sequelize";
import sequelizeConnection from '../db/models';
import Helper from './Helper';

const create = async () => {
    try {
        const t = await sequelize.transaction({
            isolationLevel: Transaction.ISOLATION_LEVELS.READ_UNCOMMITTED
        });
        return Promise.resolve({
            status: true,
            data: t
        });

    } catch (error) {
        return Promise.reject({
            status: false,
            error
        });
    }
}

const commit = async transaction => {
   try {
    await transaction.commit();
    return Promise.resolve({
        status: true
    })
   } catch (error) {
       await rollback(transaction);
        return Promise.reject({
            status: false,
            error
        });
   }

}

const rollback = async transaction => {
    try {
        await transaction.rollback();
    } catch (error) {
        return Promise.reject({
            status: false,
            error
        });
    }
}

module.exports = {
    create,
    commit,
    rollback
}
