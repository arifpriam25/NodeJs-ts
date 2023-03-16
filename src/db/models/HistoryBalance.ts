'use strict';

import { DataTypes, Model, Optional } from "sequelize";
import connection from "./index";
import User from "./User";
import Orders, { OrdersAttributes } from "./Orders";
import Deposit, { DepositAttributes } from "./Deposits";

export interface HistoryBalanceAttributes {
  id: number;
  idUser: number;
  idOrder: number | null;
  idDepo: number | null;
  amount: number;
  balance: number;
}
export interface HistoryBJoin extends HistoryBalanceAttributes{
  Order?:OrdersAttributes;
  Depo?:DepositAttributes;
}

export type HistoryBalanceInput = Optional<HistoryBalanceAttributes, 'id'>
export type HistoryBalanceOutput = Required<HistoryBalanceAttributes>
// export type OrderJoinsReq = Required<OrderJoin>

class HistoryBalance extends Model<HistoryBalanceAttributes, HistoryBalanceInput> implements HistoryBalanceAttributes {
  id!: number;
  idUser!: number;
  idOrder!: number | null;
  idDepo!: number | null;
  amount!: number;
  balance!: number;
}

HistoryBalance.init({
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
  idOrder: {
    type: DataTypes.INTEGER,
    references: {
      model: 'Orders',
      key: 'id'
    },
  },
  idDepo: {
    type: DataTypes.INTEGER,
    references: {
      model: 'Deposits',
      key: 'id'
    },
  },
  amount: {
    allowNull: false,
    type: DataTypes.FLOAT
  },
  balance: {
    allowNull: false,
    type: DataTypes.FLOAT
  }
}, {
  timestamps: true,
  sequelize: connection,
  underscored: false
});
HistoryBalance.belongsTo(Orders, { foreignKey: "idOrder" });
HistoryBalance.belongsTo(Deposit, { foreignKey: "idDepo" });
HistoryBalance.belongsTo(User, { foreignKey: "idUser" });

export default HistoryBalance;