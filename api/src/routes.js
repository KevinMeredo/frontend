const { Router, request } = require('express');

const { MedicoController } = require('./controllers/medico');
const { UserController } = require('./controllers/user');
const { PacienteController } = require('./controllers/paciente');
const { ConsultaController } = require('./controllers/consulta');
const { authMiddleware } = require('./middleware/auth-middleware');

const routes = Router();

const medicoController = new MedicoController();
const userController = new UserController();
const pacienteController = new PacienteController();
const consultaController = new ConsultaController();

routes.post('/medico', authMiddleware, medicoController.create);
routes.get('/medicos', authMiddleware, medicoController.getAll);
routes.get('/medico/:CRM', authMiddleware, medicoController.getByCRM)
routes.delete('/medico/:id', authMiddleware, medicoController.delete);
routes.put('/medico/:id', authMiddleware, medicoController.update);

routes.post('/paciente', authMiddleware, pacienteController.create);
routes.get('/pacientes', authMiddleware, pacienteController.getAll);
routes.get('/paciente/:CPF', authMiddleware, pacienteController.getByCPF)
routes.delete('/paciente/:id', authMiddleware, pacienteController.delete);
routes.put('/paciente/:id', authMiddleware, pacienteController.update);

routes.post('/consulta', authMiddleware, consultaController.create);
routes.get('/consultas', authMiddleware, consultaController.getAll);
routes.delete('/consulta/:id', authMiddleware, consultaController.delete);
routes.put('/consulta/:id', authMiddleware, consultaController.update);

routes.post('/register', userController.register);
routes.post('/login', userController.login);

module.exports = { routes };
