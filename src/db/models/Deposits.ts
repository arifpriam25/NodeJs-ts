'use strict';

import { DataTypes, Model, Optional } from "sequelize";
import connection from "./index";
import User, { UserAttributes } from "./User";

export interface DepositAttributes {
  id: number;
  idUser: number;
  amount: number;
  method: string;
}
export interface DepositJoin extends DepositAttributes{
  User?:UserAttributes;
}

export type DepositInput = Optional<DepositAttributes, 'id'>
// export type OrderJoinsReq = Required<OrderJoin>

export type OrderJoinsReqJoin = Required<DepositJoin>

class Deposit extends Model<DepositAttributes, DepositInput> implements DepositAttributes {
  id!: number;
  idUser!: number;
  amount!: number;
  method!: string;
}

Deposit.init({
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER
  },
  idUser: {
    allowNull: false,
    type: DataTypes.INTEGER,
    references: {
      model: 'Users',
      key: 'id'
    },

  },
  amount: {
    allowNull: false,
    type: DataTypes.FLOAT
  },
  method: {
    allowNull: false,
    type: DataTypes.STRING
  }
}, {
  timestamps: true,
  sequelize: connection,
  underscored: false
});
Deposit.belongsTo(User, { foreignKey: "idUser" });
Deposit.belongsTo(User, { foreignKey: "idUser", onDelete:"CASCADE" });

export default Deposit;