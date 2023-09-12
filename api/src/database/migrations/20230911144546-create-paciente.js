'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable('paciente', {
            id: {
              type: Sequelize.INTEGER,
              allowNull: false,
              primaryKey: true,
              autoIncrement: true
            },
            CPF: {
                type: Sequelize.TEXT,
                allowNull: false,
                unique: true
            },
            nome: {
                type: Sequelize.TEXT,
                allowNull: false,
            },
            email: {
                type: Sequelize.TEXT,
                allowNull: false,
            },
            RG: {
              type: Sequelize.TEXT,
              allowNull: false,
              unique: true
            },
            naturalidade: {
              type: Sequelize.TEXT,
              allowNull: false, 
            },
            nascimento: {
              type: Sequelize.DATE
            }
        });
    },

    async down(queryInterface, Sequelize) {
        await queryInterface.dropTable('paciente');
    }
};
