const { Model, DataTypes } = require("sequelize");

class ConsultaModel extends Model {
    static init(database) {
        super.init({
            CRM_Medico: DataTypes.TEXT,
            CPF_Paciente: DataTypes.TEXT,
            tipo: DataTypes.TEXT,
            status: DataTypes.TEXT,
            urgencia: DataTypes.TEXT,
            observação: DataTypes.TEXT,
            dia: DataTypes.DATE,    
        }, {
            tableName: 'consulta',
            modelName: 'ConsultaModel',
            timestamps: false,
            sequelize: database
        });
    }
}

module.exports = { ConsultaModel };
