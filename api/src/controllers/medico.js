const { HttpHelper } = require('../utils/http-helper');
const { MedicoModel } = require('../models/medico-model');
const { ConsultaModel } = require('../models/consulta-model');

class MedicoController {
    async create(request, response) {
        const httpHelper = new HttpHelper(response);
        try {
            const { CPF, CRM, nascimento, nome, naturalidade, email } = request.body;
            if (!CPF) return httpHelper.badRequest('CPF inválido!');

            if (!CRM)  return httpHelper.badRequest('CRM inválido!');

            if (!nascimento)  return httpHelper.badRequest('Data de nascimento inválido!');

            if (!nome)  return httpHelper.badRequest('Nome inválido!');

            if (!naturalidade)  return httpHelper.badRequest('Naturalidade inválida!');

            if (!email)  return httpHelper.badRequest('Email inválido!');

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
    async getByCRM(request, response) {
        const httpHelper = new HttpHelper(response);
        try {
            const medico = await MedicoModel.findOne({ where: { CRM: request.params.CRM} })
            if(medico){
                return httpHelper.ok(medico);
            }
            return httpHelper.notFound("Medico não encontrado")
                }   catch (error) {
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
            const temConsulta = await ConsultaModel.findOne({where: {CRM_Medico: medicoExiste.CRM }})
            if (temConsulta) return httpHelper.badRequest('Não pode deletar Médico com consultas registradas!');
            await MedicoModel.destroy({ where: { id } });
            return httpHelper.ok({
                message: 'Medico deletado com sucesso!'
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
