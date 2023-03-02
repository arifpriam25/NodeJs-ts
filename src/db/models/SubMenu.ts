import { DataTypes, IntegerDataType, Model, Optional } from "sequelize";
import connection from "../../config/dbConnect";

interface MasterMenuAttributes {
  id?: number,
  name?: string | null,
  masterMenuId?:number|null,
  url?: string | null,
  title?: string | null,
  icon?: string | null,
  ordering?: number | null,
  isTargetSelf?: boolean | null,
  active?: boolean | null,

  createAt?: Date,
  updateAt?: Date
}


export interface MasterMenuInput extends Optional<MasterMenuAttributes, 'id'> { }
export interface MasterMenuOutput extends Required<MasterMenuAttributes> { }

class MasterMenu extends Model<MasterMenuAttributes, MasterMenuInput> implements MasterMenuAttributes {
  public id!: number;
  public name!: string;
  public masterMenuId!:number;
  public url!: string;
  public title!: string;
  public icon!: string;
  public ordering!: number;
  public isTargetSelf!: boolean;
  public active!: boolean;
  public readonly createAt!: Date;
  public readonly updateAt!: Date;
}

MasterMenu.init({
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER
  },
  name: {
    allowNull: true,
    type: DataTypes.STRING
  },
  masterMenuId: {
    allowNull: true,
    type: DataTypes.INTEGER
  },
  url: {
    allowNull: true,
    type: DataTypes.STRING
  },
  title: {
    allowNull: true,
    type: DataTypes.STRING
  },
  icon:{
    allowNull:true,
    type:DataTypes.STRING,
  },
  ordering:{
    allowNull:true,
    type:DataTypes.INTEGER,
  },
  isTargetSelf: {
    allowNull: true,
    type: DataTypes.BOOLEAN
  },
  active: {
    allowNull: true,
    type: DataTypes.BOOLEAN
  }
}, {
  timestamps: true,
  sequelize: connection,
  underscored: false
});

export default MasterMenu;


// 'use strict';
// const {
//   Model
// } = require('sequelize');
// module.exports = (sequelize, DataTypes) => {
//   class MasterMenu extends Model {
//     /**
//      * Helper method for defining associations.
//      * This method is not a part of Sequelize lifecycle.
//      * The `models/index` file will call this method automatically.
//      */
//     static associate(models) {
//       // define association here
//     }
//   }
//   MasterMenu.init({
//     name: DataTypes.STRING,
//     icon: DataTypes.TEXT,
//     ordering: DataTypes.INTEGER,
//     active: DataTypes.BOOLEAN
//   }, {
//     sequelize,
//     modelName: 'MasterMenu',
//   });
//   return MasterMenu;
// };