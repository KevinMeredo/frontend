import Dados from '../Medicos_dados.json'
import '../App.css';
import 'bootstrap/dist/css/bootstrap.min.css'
import { useState } from 'react';

export function Medicos() {
    const [paginaAtual, setPaginaAtual] = useState(1);
    const registrosPorPagina = 5;
    const ultimoIndice = paginaAtual * registrosPorPagina;
    const primeiroIndice = ultimoIndice - registrosPorPagina;
    const registros = Dados.slice(primeiroIndice, ultimoIndice);
    const paginaN = Math.ceil(Dados.length / registrosPorPagina);
    const numeros = [...Array(paginaN+1).keys()].slice(1);
    return (
      <div className="App">
  
        <table className='table'>
            <thead>
              <tr>
               <th>Nome</th>
               <th>CPF</th>
               <th>CRM</th>
               <th>Data de Nasc</th>
               <th>Naturalidade</th>
              </tr>
               
            </thead>
            <tbody>
                {registros.map((d,i) => (
                    <tr key={i}> 
                        <td>{d.Nome}</td>
                        <td>{d.CPF}</td>
                        <td>{d.CRM}</td>
                        <td>{d.dataNasc}</td>
                        <td>{d.Naturalidade}</td>
                    </tr>
                ))}
            </tbody>
        </table>
        <nav>
          <ul className='pagination'>
                  <li className='page-item'>
                    <a  className='page-link' onClick={prePage}>anterior</a>
                  </li>
                  {
                    numeros.map((n, i) => (
                      <li className={`page-item ${paginaAtual === n ? 'active' : ''}`} key={i}> 
                        <a  className='page-link'
                        onClick={() => changePage(i)}>{n}</a>
                      </li>
                    ))
                  }
                  <li className='page-item'>
                    <a  className='page-link' onClick={nextPage}>próxima</a>
                  </li>
          </ul>
        </nav>
      </div>
    );
    function  prePage(){
        if(paginaAtual !== 1){
          setPaginaAtual(paginaAtual - 1)
        }
    }
    function  nextPage(){
      if(paginaAtual !== paginaN){
        setPaginaAtual(paginaAtual + 1)
        console.log(paginaAtual)
      }
    }
    function  changePage(id){
      if(paginaAtual !== id + 1){
        setPaginaAtual(id + 1)
      }
    }
  }
  