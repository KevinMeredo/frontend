'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable('user', {
            CPF:  {
                type: Sequelize.INTEGER,
                allowNull: false,
                primaryKey: true,
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
              type: Sequelize.DATE
            }
            
        });
    },

    async down(queryInterface, Sequelize) {
        await queryInterface.dropTable('user');
    }
};
