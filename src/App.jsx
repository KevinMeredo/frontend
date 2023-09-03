import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Pacientes } from './paginas/pacientes';

export default function App() {
  return (
      <BrowserRouter>
        <Routes>
          <Route exact path='/' element={<Pacientes />} />
        </Routes>
      </BrowserRouter>
  );
}