const { HttpHelper } = require("../utils/http-helper");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { UserModel } = require('../models/user-model');

class UserController {
    async register(request, response) {
        const httpHelper = new HttpHelper(response);
        try {
            const { email, senha, CPF, nome, nascimento } = request.body;
            console.log(request.body);
            if (!email || !senha || !CPF || !nome || !nascimento) return httpHelper.badRequest('Nome, CPf, E-mail, Data de Nascimento e senha são obrigatórios!');
            const userAlreadyExists = await UserModel.findOne({ where: { email } });
            if (userAlreadyExists) return httpHelper.badRequest('E-mail de usuário já cadastrado!');
            const passwordHashed = await bcrypt.hash(
                senha,
                Number(process.env.SALT)
            );
            const user = await UserModel.create({
                email,
                senha: passwordHashed,
                CPF,
                nome,
                nascimento
            });
            if (!user) return httpHelper.badRequest('Houve um erro ao criar usuário');
            const accessToken = jwt.sign(
                { id: user.id },
                process.env.TOKEN_SECRET,
                { expiresIn: process.env.TOKEN_EXPIRES_IN }
            );
            return httpHelper.created({ accessToken });
        } catch (error) {
            return httpHelper.internalError(error);
        }
    }

    async login(request, response) {
        const httpHelper = new HttpHelper(response);
        try {
            const { CPF, senha } = request.body;
            if (!CPF || !senha) return httpHelper.badRequest('CPF e senha são obrigatórios!');
            const userExists = await UserModel.findOne({ where: { CPF } });
            if (!userExists) return httpHelper.notFound('Usuário não encontrado!');
            const isPasswordValid = await bcrypt.compare(senha, userExists.senha);
            if (!isPasswordValid) return httpHelper.badRequest('Senha incorreta!');
            const accessToken = jwt.sign(
                { id: userExists.id },
                process.env.TOKEN_SECRET,
                { expiresIn: process.env.TOKEN_EXPIRES_IN }
            );
            return httpHelper.ok({ accessToken });
        } catch (error) {
            return httpHelper.internalError(error);
        }
    }
    async update(request, response) {
        const httpHelper = new HttpHelper(response);
        try {
            const { id } = request.params;
            const { CPF, senha, nascimento, nome, email } = request.body;
            if (!id) return httpHelper.badRequest('Id não informado!');

            const UserExiste = await UserModel.findByPk(id);
            if (!UserExiste) return httpHelper.notFound('Usuário não encontrado!');
            if (email) {
                const userAlreadyExists = await UserModel.findOne({ where: { email } });
                if (userAlreadyExists) return httpHelper.badRequest('E-mail de usuário já cadastrado!');
            }
            let passwordHashed
            if (senha) {
                passwordHashed = await bcrypt.hash(
                    senha,
                    Number(process.env.SALT)
                );
            }

            await UserModel.update({
                CPF, senha: passwordHashed, nascimento, nome, email
            }, {
                where: { id }
            });
            return httpHelper.ok('Usuário atualizado com sucesso');
        } catch (error) {
            return httpHelper.internalError(error);
        }
    }
    async delete(request, response) {
        const httpHelper = new HttpHelper(response);
        try {
            const { id } = request.params;
            if (!id) return httpHelper.badRequest('Id não informado!');
            const UserExiste = await UserModel.findOne({ where: { id } });
            if (!UserExiste) return httpHelper.notFound('Usuário não encontrado!');
            await UserModel.destroy({ where: { id } });
            return httpHelper.ok({
                message: 'Usuário deletado com sucesso!'
            })
        } catch (error) {
            return httpHelper.internalError(error);
        }
    }
    async getOne(request, response) {
        const httpHelper = new HttpHelper(response);
        try {
            const { token } = request.body
            const decoded = jwt.verify(token, process.env.TOKEN_SECRET);
            var userId = decoded.id
            const user = await UserModel.findByPk( userId )
            if (user) {
                return httpHelper.ok(user);
            }
            return httpHelper.notFound("Usuário não encontrado")
        } catch (error) {
            return httpHelper.internalError(error);
        }
    }
}

module.exports = { UserController };
