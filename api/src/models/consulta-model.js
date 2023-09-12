const { Model, DataTypes } = require("sequelize");

class ConsultaModel extends Model {
    static init(database) {
        super.init({
            CRM: DataTypes.TEXT,
            RG: DataTypes.TEXT,
            tipo: DataTypes.TEXT,
            status: DataTypes.TEXT,
            urgencia: DataTypes.TEXT,
            observacao: DataTypes.TEXT,
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
