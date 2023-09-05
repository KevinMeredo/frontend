import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Pacientes } from './paginas/pacientes';
import { Agenda } from './paginas/agenda'
import { Cadastro } from './paginas/cadastro';
import { Login } from './paginas/login';
import { RecuperaSenha } from './paginas/recuperaSenha';
import { Medicos } from './paginas/medicos';
export default function App() {
  return (
      <BrowserRouter>
        <Routes>
          <Route exact path='/Pacientes' element={<Pacientes />} />
          <Route exact path='/Medicos' element={<Medicos />} />
          <Route exact path='/Agenda' element={<Agenda />} />
          <Route exact path='/Cadastro' element={<Cadastro />} />
          <Route exact path='/Login' element={<Login />} />
          <Route exact path='/RecuperaSenha' element={<RecuperaSenha />} />
        </Routes>
      </BrowserRouter>
  );
}