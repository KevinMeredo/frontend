const { HttpHelper } = require('../utils/http-helper');
const { ConsultaModel } = require('../models/consulta-model');

class ConsultaController {
    async create(request, response) {
        const httpHelper = new HttpHelper(response);
        try {
            const { CPF, CRM, dia, tipo, status, urgencia, observacao } = request.body;
            if (!CPF) return httpHelper.badRequest('Parâmetros inválidos!');

            if (!CRM)  return httpHelper.badRequest('Parâmetros inválidos!');

            if (!dia)  return httpHelper.badRequest('Parâmetros inválidos!');

            if (!tipo)  return httpHelper.badRequest('Parâmetros inválidos!');

            if (!status)  return httpHelper.badRequest('Parâmetros inválidos!');

            if (!urgencia)  return httpHelper.badRequest('Parâmetros inválidos!');

            if (!observacao)  return httpHelper.badRequest('Parâmetros inválidos!');

            const consulta = await ConsultaModel.create({
                CPF, CRM, dia, tipo, status, urgencia, observacao
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
            const { CPF, CRM, dia, tipo, status, urgencia, observacao } = request.body;
            if (!id) return httpHelper.badRequest('Parâmetros inválidos!');
            
            const consultaExiste = await ConsultaModel.findByPk(id);
            if (!consultaExiste) return httpHelper.notFound('consulta não encontrado!');
            await ConsultaModel.update({
                CPF, CRM, dia, tipo, status, urgencia, observacao
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
