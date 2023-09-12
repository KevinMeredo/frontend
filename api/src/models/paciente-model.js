const { Model, DataTypes } = require("sequelize");
const { ConsultaModel } = require("./consulta-model");
const { MedicoModel } = require("./medico-model")

class PacienteModel extends Model {
    static init(database) {
        super.init({
            nome: DataTypes.TEXT,
            email: DataTypes.TEXT,
            CPF: DataTypes.TEXT,
            nascimento: DataTypes.DATE,
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

/*PacienteModel.hasMany(ConsultaModel, { foreignKey: PacienteModel.CPF})
MedicoModel.hasMany(ConsultaModel, { foreignKey: MedicoModel.CRM})
ConsultaModel.belongsTo(MedicoModel, { foreignKey: MedicoModel.CRM})
ConsultaModel.belongsTo(PacienteModel, { foreignKey: PacienteModel.CPF})*/

module.exports = { PacienteModel };
