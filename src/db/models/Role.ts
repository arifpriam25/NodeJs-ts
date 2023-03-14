'use strict';

import { DataTypes, Model, Optional } from "sequelize";
import connection from "./index";

export interface RoleAttributes {
  id?: number;
  roleName?: string | null;
  active?: boolean | null;

  createAt?: Date;
  updateAt?: Date;
}


export type RoleInput = Optional<RoleAttributes, 'id'>
export type RoleOutput = Required<RoleAttributes>

class Role extends Model<RoleAttributes, RoleInput> implements RoleAttributes {
  public id!: number;
  public roleName!: string;
  public active!: boolean;
  public readonly createAt!: Date;
  public readonly updateAt!: Date;
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
    allowNull: false,
    type: DataTypes.BOOLEAN
  }
}, {
  timestamps: true,
  sequelize: connection,
  underscored: false
});

export default Role;