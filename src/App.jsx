import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Pacientes } from './paginas/pacientes';
import { Agenda } from './paginas/agenda'
export default function App() {
  return (
      <BrowserRouter>
        <Routes>
          <Route exact path='/' element={<Pacientes />} />
          <Route exact path='/' element={<Agenda />} />
        </Routes>
      </BrowserRouter>
  );
}