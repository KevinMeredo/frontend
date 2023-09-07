import { BrowserRouter, Route, Routes, Link } from 'react-router-dom';
import { Agenda } from './paginas/agenda'
import { Cadastro } from './paginas/cadastro';
import { Login } from './paginas/login';
import { RecuperaSenha } from './paginas/recuperaSenha';
import { PacientesMui } from './paginas/pacientesMui';
import { MedicosMui } from './paginas/medicosMui';
export default function App() {
  return (
      <BrowserRouter >
        <Routes >
          <Route exact path='/Pacientes' element={<PacientesMui />} />
          <Route exact path='/Medicos' element={<MedicosMui />} />
          <Route exact path='/Agenda' element={<Agenda />} />
          <Route exact path='/Cadastro' element={<Cadastro />} />
          <Route exact path='/Login' element={<Login />} />
          <Route exact path='/RecuperaSenha' element={<RecuperaSenha />} />
        </Routes>
      </BrowserRouter>
  );
}