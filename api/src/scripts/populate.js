require('../database');

const { PacienteModel } = require('../models/paciente-model');
const { MedicorModel } = require('../models/medico-model')
const { UserModel} = require('../models/user-model')

const pacientes = [
    {
        nome: 'carlos',
        CPF: '12378-65',
        email: 'carlos@gmail.com',
        nascimento: '10/24/2000',
        RG: '1236',
        naturalidade: 'sinop-MT'
    },
    {
        nome: 'jorge',
        CPF: '1278-65',
        email: 'jorge@gmail.com',
        nascimento: '10/24/2010',
        RG: '1546',
        naturalidade: 'VGquistão-MT'
    },
];

const users = [
    {
        nome: 'Kevin',
        email: 'kevinmedeiros159@gmail.com',
        CPF: '123456-66',
        nascimento: '12/02/1999',
        senha: 'admin'
    },
    {
        nome: 'Jorge',
        email: 'Jorge23@gmail.com',
        CPF: '123456-36',
        nascimento: '12/02/1989',
        senha: 'admin123'
    },
];

(async () => {
    for (let paciente of pacientes) {
        await PacienteModel.create({
            CPF: paciente.CPF, 
            nome: paciente.nome,
            email: paciente.email,
            nascimento: paciente.nascimento,
            RG: paciente.RG,
            naturalidade: paciente.naturalidade,
        });
    }
    for (let user of users) {
        await UserModel.create({
            nome: user.nome,
            email: user.email,
            CPF: user.CPF,
            nascimento: user.nascimento,
            senha: user.senha,
        });
    }
    console.log('Tudo cadastrado!');
})();
