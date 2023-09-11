const { HttpHelper } = require('../utils/http-helper');
const { MedicoModel } = require('../models/medico-model');

class MedicoController {
    async create(request, response) {
        const httpHelper = new HttpHelper(response);
        try {
            const { CPF, CRM, nascimento, nome, naturalidade, email } = request.body;
            if (!CPF) return httpHelper.badRequest('Parâmetros inválidos!');

            if (!CRM)  return httpHelper.badRequest('Parâmetros inválidos!');

            if (!nascimento)  return httpHelper.badRequest('Parâmetros inválidos!');

            if (!nome)  return httpHelper.badRequest('Parâmetros inválidos!');

            if (!naturalidade)  return httpHelper.badRequest('Parâmetros inválidos!');

            if (!email)  return httpHelper.badRequest('Parâmetros inválidos!');

            const medico = await MedicoModel.create({
                CPF, CRM, nascimento, nome, email, naturalidade
            });
            return httpHelper.created(medico);
        } catch (error) {
            return httpHelper.internalError(error);
        }
    }

    async getAll(request, response) {
        const httpHelper = new HttpHelper(response);
        try {
            const medicos = await MedicoModel.findAll();
            return httpHelper.ok(medicos);
        } catch (error) {
            return httpHelper.internalError(error);
        }
    }

    async delete(request, response) {
        const httpHelper = new HttpHelper(response);
        try {
            const { id } = request.params;
            if (!id) return httpHelper.badRequest('Parâmetros inválidos!');
            const medicoExiste = await MedicoModel.findOne({ where: { id } });
            if (!medicoExiste) return httpHelper.notFound('Medico não encontrado!');
            await MedicoModel.destroy({ where: { id } });
            return httpHelper.ok({
                message: 'Medico deletada com sucesso!'
            })
        } catch (error) {
            return httpHelper.internalError(error);
        }
    }

    async update(request, response) {
        const httpHelper = new HttpHelper(response);
        try {
            const { id } = request.params;
            const { CPF, CRM, nascimento, nome, naturalidade, email } = request.body;
            if (!id) return httpHelper.badRequest('Parâmetros inválidos!');
            
            const MedicoExiste = await MedicoModel.findByPk(id);
            if (!MedicoExiste) return httpHelper.notFound('medico não encontrado!');
            await MedicoModel.update({
                CPF, CRM, nascimento, nome, naturalidade, email
            }, {
                where: { id }
            });
            return httpHelper.ok({
                message: 'Medico atualizado com sucesso!'
            });
        } catch (error) {
            return httpHelper.internalError(error);
        }
    }
}

module.exports = { MedicoController };
