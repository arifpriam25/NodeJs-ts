'use strict';

import { DataTypes, Model, Optional } from "sequelize";
import connection from "./index";
import Books, { BooksAttributes } from "./Books"
import User, { UserAttributes } from "./User";

export interface OrdersAttributes {
  id?: number;
  idUser?: number;
  idBook?: number;
  quantity?: number;
  totalPrice?: number;
  buyDate?: Date;

  createAt?: Date;
  updateAt?: Date;
}
export interface OrdersJoin extends OrdersAttributes{
  User?:UserAttributes;
  Books?:BooksAttributes;
}

export type OrdersInput = Optional<OrdersAttributes, 'id'>
export type OrdersOutput = Required<OrdersAttributes>
// export type OrderJoinsReq = Required<OrderJoin>

export type OrderJoinsReqJoin = Required<OrdersJoin>

class Orders extends Model<OrdersAttributes, OrdersInput> implements OrdersAttributes {
  id!: number;
  idUser!: number;
  idBook!: number;
  quantity!: number;
  totalPrice!: number;
  buyDate!: Date;
  public readonly createAt!: Date;
  public readonly updateAt!: Date;
}

Orders.init({
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER
  },
  idUser: {
    allowNull: true,
    type: DataTypes.INTEGER
  },
  idBook: {
    allowNull: true,
    type: DataTypes.INTEGER
  },
  quantity: {
    allowNull: true,
    type: DataTypes.INTEGER
  },
  totalPrice: {
    allowNull: true,
    type: DataTypes.FLOAT
  },
  buyDate: {
    allowNull: true,
    type: DataTypes.DATE
  },
}, {
  timestamps: true,
  sequelize: connection,
  underscored: false
});
Orders.belongsTo(Books, { foreignKey: "idBook" });
Orders.belongsTo(User, { foreignKey: "idUser" });

export default Orders;