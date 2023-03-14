'use strict';
import { DataTypes, Model, Optional } from "sequelize";
import Role, { RoleAttributes } from "./Role";
import connection from "./index";


export interface UserAttributes {
    id?: number;
    name?: string | null;
    email?: string | null;
    roleId?: number | null;
    password?: string | null;
    accessToken?: string | null;
    balance?: number | null;
    verified?: boolean | null;
    active?: boolean | null;
    createAt?: Date;
    updateAt?: Date;

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

    public readonly createAt!: Date;
    public readonly updateAt!: Date;
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
        allowNull: true
    },
    email: {
        type: DataTypes.STRING,
        allowNull: true
    },
    roleId: {
        type: DataTypes.INTEGER,
        allowNull: true
    },
    password: {
        type: DataTypes.TEXT,
        allowNull: true
    },
    accessToken: {
        type: DataTypes.TEXT,
        allowNull: true
    },
    balance: {
        type: DataTypes.FLOAT,
        allowNull: true
    },
    verified: {
        type: DataTypes.BOOLEAN,
        allowNull: true
    },
    active: {
        type: DataTypes.BOOLEAN,
        allowNull: true
    }

}, {
    timestamps: true,
    sequelize: connection,
    underscored: false
});

User.belongsTo(Role, { foreignKey: "roleId" });

export default User;