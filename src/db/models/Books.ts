import { DataTypes, Model, Optional } from "sequelize";
import connection from "../../config/dbConnect";

interface BooksAttributes {
  id?: number,
  title?: string | null,
  author?: string | null,
  publisher?: string | null,
  year?: number | null,
  price?: number | null,
  quantity?: number | null,
  active?: boolean | null,

  createAt?: Date,
  updateAt?: Date
}


export interface BooksInput extends Optional<BooksAttributes, 'id'> { }
export interface BooksOutput extends Required<BooksAttributes> { }

class Books extends Model<BooksAttributes, BooksInput> implements BooksAttributes {
  id!: number;
  title!: string;
  author!: string;
  publisher!: string;
  year!: number;
  price!: number;
  quantity!: number;
  active!: boolean;
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
  title: {
    allowNull: true,
    type: DataTypes.STRING
  },
  author: {
    allowNull: true,
    type: DataTypes.STRING
  },
  publisher: {
    allowNull: true,
    type: DataTypes.STRING
  },
  year: {
    allowNull: true,
    type: DataTypes.INTEGER
  },
  price: {
    allowNull: true,
    type: DataTypes.FLOAT
  },
  quantity: {
    allowNull: true,
    type: DataTypes.INTEGER
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

export default Books;