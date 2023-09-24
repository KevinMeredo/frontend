import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { Agenda } from './paginas/agenda'
import { Cadastro } from './paginas/cadastro';
import { Login } from './paginas/login';
import { RecuperaSenha } from './paginas/recuperaSenha';
import { PacientesMui } from './paginas/pacientesMui';
import { MedicosMui } from './paginas/medicosMui';
import { Painel } from './paginas/Painel';
import { isAuthenticated } from './utils/is-authenticated';
import { EditarPerfil } from './paginas/editarPerfil';


export function PrivateRoute({ children }) {
  if (!isAuthenticated()) {
    return <Navigate to="/" replace />
  }
  return children;
}

export default function App() {


  return (
    <BrowserRouter >
      <Routes >
        <Route index path="/" element={<Login />} />
        <Route exact path='/Cadastro' element={<Cadastro />} />
        <Route exact path='/RecuperaSenha' element={<RecuperaSenha />} />
        <Route exact path='/EditarPerfil' element={(
          <PrivateRoute>
            <EditarPerfil />
          </PrivateRoute>
        )} />
        <Route exact path='/Pacientes' element={(
          <PrivateRoute>
            <PacientesMui />
          </PrivateRoute>
        )} />
        
        <Route exact path='/Medicos' element={(
          <PrivateRoute>
            <MedicosMui />
          </PrivateRoute>
        )} />
        <Route exact path='/Agenda' element={(
          <PrivateRoute>
            <Agenda />
          </PrivateRoute>
        )} />
        <Route exact path='/Painel' element={(
          <PrivateRoute>
            <Painel />
          </PrivateRoute>
        )} />

      </Routes>
    </BrowserRouter>
  );
}