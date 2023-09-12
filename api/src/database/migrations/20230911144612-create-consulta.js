'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable('consulta', {
            id: {
                type: Sequelize.INTEGER,
                allowNull: false,
                primaryKey: true,
                autoIncrement: true
            },
            CPF_Paciente: {
                type: Sequelize.TEXT,
                allowNull: false,
                references: {model: 'paciente', key: 'CPF'},
                onUpdate: 'CASCADE',
                onDelete: 'RESTRICT',
              },
            CRM_Medico: {
              type: Sequelize.TEXT,
              allowNull: false,
              references: {model: 'medico', key: 'CRM'},
              onUpdate: 'CASCADE',
              onDelete: 'RESTRICT',
            },
            tipo: {
                type: Sequelize.TEXT,
                allowNull: false,
            },
            status: {
              type: Sequelize.TEXT,
              allowNull: false, 
            },
            urgencia: {
              type: Sequelize.TEXT,
              allowNull: false
            },
            dia: {
              type: Sequelize.DATE,
              allowNull: false
            },
            observação: {
              type: Sequelize.TEXT,
              allowNull: false
            }
        });
    },

    async down(queryInterface, Sequelize) {
        await queryInterface.dropTable('consulta');
    }
};
