const { Model, DataTypes } = require("sequelize");

class MedicoModel extends Model {
    static init(database) {
        super.init({
            nome: DataTypes.TEXT,
            email: DataTypes.TEXT,
            CPF: DataTypes.TEXT,
            nascimento: DataTypes.DATEONLY,
            CRM: DataTypes.TEXT,
            naturalidade: DataTypes.TEXT
        }, {
            tableName: 'medico',
            modelName: 'MedicoModel',
            timestamps: false,
            sequelize: database
        });
    }
}

module.exports = { MedicoModel };
