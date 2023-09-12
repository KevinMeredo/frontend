const { HttpHelper } = require("../utils/http-helper");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { UserModel } = require('../models/user-model');

class UserController {
    async register(request, response) {
        const httpHelper = new HttpHelper(response);
        try {
            const { email, senha, CPF, nome } = request.body;
            if (!email || !senha || !CPF ||!nome) return httpHelper.badRequest('Nome, CPF, E-mail e senha são obrigatórios!');
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
                nome
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
            const { email, senha } = request.body;
            if (!email || !senha) return httpHelper.badRequest('E-mail e senha são obrigatórios!');
            const userExists = await UserModel.findOne({ where: { email } });
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
}

module.exports = { UserController };