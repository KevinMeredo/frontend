const { HttpHelper } = require('../utils/http-helper');
const { ConsultaModel } = require('../models/consulta-model');

class ConsultaController {
    async create(request, response) {
        const httpHelper = new HttpHelper(response);
        try {
            const { CPF_Paciente, CRM_Medico, dia, tipo, status, urgencia, observação } = request.body;
            if (!CPF_Paciente) return httpHelper.badRequest('CPF inválido!');

            if (!CRM_Medico)  return httpHelper.badRequest('CRM inválido!');

            if (!dia)  return httpHelper.badRequest('Dia inválido!');

            if (!tipo)  return httpHelper.badRequest('Tipo inválido');

            if (!status)  return httpHelper.badRequest('status inválidos!');

            if (!urgencia)  return httpHelper.badRequest('urgencia inválida!');

            if (!observação)  return httpHelper.badRequest('Observação inválida!');

            const consulta = await ConsultaModel.create({
                CPF_Paciente, CRM_Medico, dia, tipo, status, urgencia, observação
            });
            return httpHelper.created(consulta);
        } catch (error) {
            return httpHelper.internalError(error);
        }
    }

    async getAll(request, response) {
        const httpHelper = new HttpHelper(response);
        try {
            const consultas = await ConsultaModel.findAll();
            return httpHelper.ok(consultas);
        } catch (error) {
            return httpHelper.internalError(error);
        }
    }

    async delete(request, response) {
        const httpHelper = new HttpHelper(response);
        try {
            const { id } = request.params;
            if (!id) return httpHelper.badRequest('Parâmetros inválidos!');
            const consultaExiste = await ConsultaModel.findOne({ where: { id } });
            if (!consultaExiste) return httpHelper.notFound('Consulta não encontrada!');
            await ConsultaModel.destroy({ where: { id } });
            return httpHelper.ok({
                message: 'Consulta deletada com sucesso!'
            })
        } catch (error) {
            return httpHelper.internalError(error);
        }
    }

    async update(request, response) {
        const httpHelper = new HttpHelper(response);
        try {
            const { id } = request.params;
            const { CPF_Paciente, CRM_Medico, dia, tipo, status, urgencia, observação } = request.body;
            if (!id) return httpHelper.badRequest('Parâmetros inválidos!');
            
            const consultaExiste = await ConsultaModel.findByPk(id);
            if (!consultaExiste) return httpHelper.notFound('consulta não encontrado!');
            await ConsultaModel.update({
                CPF_Paciente, CRM_Medico, dia, tipo, status, urgencia, observação
            }, {
                where: { id }
            });
            return httpHelper.ok({
                message: 'Consulta atualizada com sucesso!'
            });
        } catch (error) {
            return httpHelper.internalError(error);
        }
    }
}

module.exports = { ConsultaController };
