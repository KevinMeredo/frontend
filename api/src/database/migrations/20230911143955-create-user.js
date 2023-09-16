'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable('user', {
            id: {
                type: Sequelize.INTEGER,
                allowNull: false,
                primaryKey: true,
                autoIncrement: true
              },
            CPF:  {
                type: Sequelize.TEXT,
                allowNull: false,
                unique: true
            },
            email: {
                type: Sequelize.TEXT,
                allowNull: false,
                unique: true
            },
            senha: {
                type: Sequelize.TEXT,
                allowNull: false
            },
            nome: {
              type: Sequelize.TEXT,
              allowNull: false
            },
            nascimento: {
              type: Sequelize.DATEONLY
            }
            
        });
    },

    async down(queryInterface, Sequelize) {
        await queryInterface.dropTable('user');
    }
};
