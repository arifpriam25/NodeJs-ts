import { DataTypes, Model, Optional } from "sequelize";
import connection from "../../config/dbConnect";

interface BooksAttributes {
  id?: number,
  idUser?: number,
  idBook?: number,
  quantity?: number,
  totalPrice?: number,
  buyDate?: Date,

  createAt?: Date,
  updateAt?: Date
}


export interface BooksInput extends Optional<BooksAttributes, 'id'> { }
export interface BooksOutput extends Required<BooksAttributes> { }

class Books extends Model<BooksAttributes, BooksInput> implements BooksAttributes {
  id!: number;
  idUser!: number;
  idBook!: number;
  quantity!: number;
  totalPrice!: number;
  buyDate!: Date;
  public readonly createAt!: Date;
  public readonly updateAt!: Date;
}

Books.init({
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

export default Books;