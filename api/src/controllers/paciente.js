const { HttpHelper } = require('../utils/http-helper');
const { PacienteModel } = require('../models/paciente-model');

class PacienteController {
    async create(request, response) {
        const httpHelper = new HttpHelper(response);
        try {
            const { CPF, RG, nascimento, nome, naturalidade, email } = request.body;
            if (!CPF) return httpHelper.badRequest('Parâmetros inválidos!');

            if (!RG)  return httpHelper.badRequest('Parâmetros inválidos!');

            if (!nascimento)  return httpHelper.badRequest('Parâmetros inválidos!');

            if (!nome)  return httpHelper.badRequest('Parâmetros inválidos!');

            if (!naturalidade)  return httpHelper.badRequest('Parâmetros inválidos!');

            if (!email)  return httpHelper.badRequest('Parâmetros inválidos!');

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
