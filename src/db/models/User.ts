'use strict';
import { DataTypes, Model, Optional } from "sequelize";
import Role, { RoleAttributes } from "./Role";
import connection from "./index";


export interface UserAttributes {
    id: number;
    name: string;
    email: string;
    roleId: number;
    password: string;
    accessToken: string | null;
    balance: number;
    verified: boolean;
    active: boolean;

}
export interface UserJoinAttribute extends UserAttributes {
    Role?: RoleAttributes;
}

export type UserInput = Optional<UserAttributes, 'id'>
export type UserOutput = Required<UserAttributes>

class User extends Model<UserAttributes, UserInput> implements UserAttributes {
    public id!: number;
    public name!: string;
    public email!: string;
    public roleId!: number;
    public password!: string;
    public accessToken!: string;
    public balance!: number;
    public verified!: boolean;
    public active!: boolean;
}

User.init({
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false
    },
    roleId: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    password: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    accessToken: {
        type: DataTypes.TEXT,
        allowNull: true
    },
    balance: {
        type: DataTypes.FLOAT,
        allowNull: false
    },
    verified: {
        type: DataTypes.BOOLEAN,
        allowNull: false
    },
    active: {
        type: DataTypes.BOOLEAN,
        allowNull: false
    }

}, {
    timestamps: true,
    sequelize: connection,
    underscored: false
});

User.belongsTo(Role, { foreignKey: "roleId" });

export default User;