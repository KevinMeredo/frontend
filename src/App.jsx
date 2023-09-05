import { BrowserRouter, Route, Routes, Link } from 'react-router-dom';
import { Pacientes } from './paginas/pacientes';
import { Agenda } from './paginas/agenda'
import { Cadastro } from './paginas/cadastro';
import { Login } from './paginas/login';
import { RecuperaSenha } from './paginas/recuperaSenha';
import { Medicos } from './paginas/medicos';
export default function App() {
  return (
      <BrowserRouter >

        <nav>
          <ul>
            <li>
              <Link to="/Pacientes">Pacientes</Link>
            </li>
            <li>
              <Link to="/Medicos">Medicos</Link>
            </li>
          </ul>
        </nav>
        <Routes className='d-flex justify-content-center'>
          
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