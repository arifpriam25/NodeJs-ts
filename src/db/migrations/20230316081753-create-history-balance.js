'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('HistoryBalances', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      idUser: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references:{
          model:'Users',
          key: 'id'
        }
      },
      idOrder: {
        type: Sequelize.INTEGER,
        references:{
          model:'Orders',
          key: 'id'
        }
      },
      idDepo: {
        type: Sequelize.INTEGER,
        references:{
          model:'Deposits',
          key: 'id'
        }
      },
      amount: {
        allowNull: false,
        type: Sequelize.FLOAT
      },
      balance: {
        allowNull: false,
        type: Sequelize.FLOAT
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface) {
    await queryInterface.dropTable('HistoryBalances');
  }
};