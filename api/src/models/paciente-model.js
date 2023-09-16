const { Model, DataTypes } = require("sequelize");

class PacienteModel extends Model {
    static init(database) {
        super.init({
            nome: DataTypes.TEXT,
            email: DataTypes.TEXT,
            CPF: DataTypes.TEXT,
            nascimento: DataTypes.DATEONLY,
            RG: DataTypes.TEXT,
            naturalidade: DataTypes.TEXT
        }, {
            tableName: 'paciente',
            modelName: 'PacienteModel',
            timestamps: false,
            sequelize: database
        });
    }
}


module.exports = { PacienteModel };
