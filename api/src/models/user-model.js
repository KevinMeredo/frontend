const { Model, DataTypes } = require("sequelize");

class UserModel extends Model {
    static init(database) {
        super.init({
            nome: DataTypes.TEXT,
            email: DataTypes.TEXT,
            CPF: DataTypes.TEXT,
            nascimento: DataTypes.DATEONLY,
            senha: DataTypes.TEXT
        }, {
            tableName: 'user',
            modelName: 'UserModel',
            timestamps: false,
            sequelize: database
        });
    }
}

module.exports = { UserModel };
