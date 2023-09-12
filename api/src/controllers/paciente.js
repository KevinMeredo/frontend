const { HttpHelper } = require('../utils/http-helper');
const { PacienteModel } = require('../models/paciente-model');
const { ConsultaModel } = require('../models/consulta-model')

class PacienteController {
    async create(request, response) {
        const httpHelper = new HttpHelper(response);
        try {
            const { CPF, RG, nascimento, nome, naturalidade, email } = request.body;
            if (!CPF) return httpHelper.badRequest('CPF inválido!');

            if (!RG)  return httpHelper.badRequest('RG inválido!');

            if (!nascimento)  return httpHelper.badRequest('Data de nascimento inválido!');

            if (!nome)  return httpHelper.badRequest('Nome inválido!');

            if (!naturalidade)  return httpHelper.badRequest('Naturalida inválida!');

            if (!email)  return httpHelper.badRequest('Email inválido!');

            const paciente = await PacienteModel.create({
                CPF, RG, nascimento, nome, email, naturalidade
            });
            return httpHelper.created(paciente);
        } catch (error) {
            return httpHelper.internalError(error);
        }
    }

    async getAll(request, response) {
        const httpHelper = new HttpHelper(response);
        try {
            const pacientes = await PacienteModel.findAll();
            return httpHelper.ok(pacientes);
        } catch (error) {
            return httpHelper.internalError(error);
        }
    }

    async delete(request, response) {
        const httpHelper = new HttpHelper(response);
        try {
            const { id } = request.params;
            if (!id) return httpHelper.badRequest('Parâmetros inválidos!');
            const pacienteExiste = await PacienteModel.findOne({ where: { id } });
            if (!pacienteExiste) return httpHelper.notFound('Paciente não encontrado!');
            const temConsulta = await ConsultaModel.findOne({where: {CPF_Paciente: pacienteExiste.CPF }})
            if (temConsulta) return httpHelper.notFound('Não pode deletar paciente com consultas registradas!');
            await PacienteModel.destroy({ where: { id } });
            return httpHelper.ok({
                message: 'Paciente deletado com sucesso!'
            })
        } catch (error) {
            return httpHelper.internalError(error);
        }
    }

    async update(request, response) {
        const httpHelper = new HttpHelper(response);
        try {
            const { id } = request.params;
            const { CPF, RG, nascimento, nome, naturalidade, email } = request.body;
            if (!id) return httpHelper.badRequest('Parâmetros inválidos!');
            
            const PacienteExiste = await PacienteModel.findByPk(id);
            if (!PacienteExiste) return httpHelper.notFound('Paciente não encontrado!');
            await PacienteModel.update({
                CPF, RG, nascimento, nome, naturalidade, email
            }, {
                where: { id }
            });
            return httpHelper.ok({
                message: 'Paciente atualizado com sucesso!'
            });
        } catch (error) {
            return httpHelper.internalError(error);
        }
    }
}

module.exports = { PacienteController };
