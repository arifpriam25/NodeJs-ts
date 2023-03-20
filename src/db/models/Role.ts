'use strict';

import { DataTypes, Model, Optional } from "sequelize";
import connection from "./index";

export interface RoleAttributes {
  id: number;
  roleName: string;
  active: boolean;

}


export type RoleInput = Optional<RoleAttributes, 'id'>

class Role extends Model<RoleAttributes, RoleInput> implements RoleAttributes {
  public id!: number;
  public roleName!: string;
  public active!: boolean;
}

Role.init({
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER
  },
  roleName: {
    allowNull: false,
    type: DataTypes.STRING
  },
  active: {
    defaultValue: false,
    allowNull: false,
    type: DataTypes.BOOLEAN
  }
}, {
  timestamps: true,
  sequelize: connection,
  underscored: false
});

export default Role;