// import { Request,Response } from 'express';
// import sequelizeConnection from '../db/models';
// import User from '../db/models/User';
// import Orders from '../db/models/Orders';
// import Books from '../db/models/Books';

// // const create = async () => {
// //     try {
// //         const t = await sequelize.transaction({
// //             isolationLevel: Transaction.ISOLATION_LEVELS.READ_UNCOMMITTED
// //         });
// //         return Promise.resolve({
// //             status: true,
// //             data: t
// //         });

// //     } catch (error) {
// //         return Promise.reject({
// //             status: false,
// //             error
// //         });
// //     }
// // }

// // const commit = async transaction => {
// //    try {
// //     await transaction.commit();
// //     return Promise.resolve({
// //         status: true
// //     })
// //    } catch (error) {
// //        await rollback(transaction);
// //         return Promise.reject({
// //             status: false,
// //             error
// //         });
// //    }

// // }

// // const rollback = async transaction => {
// //     try {
// //         await transaction.rollback();
// //     } catch (error) {
// //         return Promise.reject({
// //             status: false,
// //             error
// //         });
// //     }
// // }

// // module.exports = {
// //     create,
// //     commit,
// //     rollback
// // }

// class Testing {
//     test = async (req:Request,res:Response) => {
//         const t = await sequelizeConnection.transaction()
//             const a = new Date().getTime()
//         try {
//             await User.update(
//                 { balance: 200000 },
//                 { where: { id: 1 }, transaction:t }
//             );
            
//             await Books.update(
//                 { quantity: 2 },
//                 { where: { id: 1 }, transaction:t }
//             );
//             await Orders.create(
//                 {
//                     idUser:1,
//                     idBook:1,
//                     quantity:2,
//                     totalPrice:150000,
//                     buyDate: new Date()
//                 },
//                 { transaction:t }
//             );
//             // throw new Error('Something went wrong!');
//             await t.commit();
//             console.log(a);
//             res.send("input ok")
            
//         } catch (error) {
//             console.error(error);
//             await t.rollback();
//         }
//     }
// }
// export default new Testing()