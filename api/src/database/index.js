const { Sequelize } = require('sequelize');
const configDatabase = require('./config');

const { ConsultaModel } = require('../models/consulta-model');
const { UserModel } = require('../models/user-model');
const { MedicoModel } = require('../models/medico-model');
const { PacienteModel } = require('../models/paciente-model');

const database = new Sequelize(configDatabase);

ConsultaModel.init(database);
UserModel.init(database);
PacienteModel.init(database);
MedicoModel.init(database)

module.exports = database;
