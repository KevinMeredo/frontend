const { Model, DataTypes } = require("sequelize");

class ConsultaModel extends Model {
    static init(database) {
        super.init({
            CRM: DataTypes.TEXT,
            CPF: DataTypes.TEXT,
            tipo: DataTypes.TEXT,
            status: DataTypes.TEXT,
            urgencia: DataTypes.TEXT,
            dia: DataTypes.DATE,    
            observacao: DataTypes.TEXT
        }, {
            tableName: 'consulta',
            modelName: 'ConsultaModel',
            timestamps: false,
            sequelize: database
        });
    }
}

module.exports = { ConsultaModel };
