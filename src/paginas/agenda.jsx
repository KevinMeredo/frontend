import  Paper  from '@mui/material/Paper';
import { Nav } from "../componentes/Nav";
import Button from '@mui/material/Button';
import Table from '@mui/material/Table';
import TableHead from '@mui/material/TableHead';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableRow from '@mui/material/TableRow';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';

import * as React from 'react';
import '../App.css'

import { useEffect, useState } from "react";
import Dados from '../Consultas_dados.json'


export function Agenda(){
    
    const opcoes = { year: 'numeric', month: 'numeric', day: 'numeric'}
    const [consultas, setConsultas] = useState([]);
    const [diasDaSemana, setDiasDaSemana] = useState([])
    useEffect(() => {
    }, []);
    
    async function  setConsultasSemana(diasDaSemana){
        setDiasDaSemana(diasDaSemana)
        console.log(diasDaSemana)
        await setConsultas(
            Dados.filter(
            function(Dados){ 
                return (diasDaSemana.includes(Dados.Dia) )
            }
            
        )) 
    };
    function getSemana(dia){
        const diasDaSemana = []
        let diaDaSemana = dia.$d.getDay()
        dia.$d.setDate(dia.$d.getDate() - diaDaSemana -1 )
        for(let i = 0; i<7;i++){
            console.log(diasDaSemana)
            dia.$d.setDate(dia.$d.getDate() + 1)
            diasDaSemana.push(dia.$d.toLocaleDateString(undefined, opcoes))
        }
        setConsultasSemana(diasDaSemana)
      }
    return(
        <>

            <Nav classname="App-header"></Nav>
            <Paper sx={{ width: '30%', overflow: 'hidden' }}>           
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DemoContainer components={['DatePicker']}>
                        <DatePicker
                            onChange={(novoValor) => {
                                getSemana(novoValor)
                            }}
                            format="DD-MM-YYYY"
                            label="Data" 
                        />
                    </DemoContainer>
                </LocalizationProvider>
            </Paper>
            <TableContainer sx={{ maxHeight: 440 }}>
                <Table stickyHeader aria-label="sticky table">
                    <TableHead>
                        <TableRow>
                            <TableCell> Domingo</TableCell>
                            <TableCell> Segunda</TableCell>
                            <TableCell> Terça</TableCell>
                            <TableCell> Quarta</TableCell>
                            <TableCell> Quinta</TableCell>
                            <TableCell> Sexta</TableCell>
                            <TableCell> Sábado</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                            <TableCell>
                            {consultas.map((consulta) => {
                               return (
                                <TableRow
                                key={consulta.id}

                                >
                                {consulta.Dia == diasDaSemana[0] && <Button size='medium' variant="contained">{consulta.Dia}</Button>}
                                </TableRow>
                                )
                            })}
                            </TableCell>
                            <TableCell>
                            {consultas.map((consulta) => {
                                return (
                                <TableRow
                                key={consulta.id}

                                >
                                {consulta.Dia == diasDaSemana[1] && <Button variant="contained">{consulta.Dia}</Button>}
                                </TableRow>
                                )
                            })}
                            </TableCell>
                            <TableCell>
                                 {consultas.map((consulta) => {

                               return (
                                <TableRow
                                key={consulta.id}

                                >
                                {consulta.Dia == diasDaSemana[2] && <Button variant="contained">{consulta.Dia}</Button>}
                                </TableRow>
                                )
                            })}
                            </TableCell>
                            <TableCell>
                            {consultas.map((consulta) => {

                                return (
                                <TableRow
                                key={consulta.id}

                                >
                                {consulta.Dia == diasDaSemana[3] && <Button variant="contained">{consulta.Dia}</Button>}
                                </TableRow>
                                )
                            })}
                            </TableCell>
                            <TableCell>
                            {consultas.map((consulta) => {

                                return (
                                <TableRow
                                key={consulta.id}

                                >
                                {consulta.Dia == diasDaSemana[4] && <Button variant="contained">{consulta.Dia}</Button>}
                                </TableRow>
                                )
                            })}
                            </TableCell>
                            <TableCell>
                            {consultas.map((consulta) => {

                                return (
                                <TableRow
                                key={consulta.id}

                                >
                                {consulta.Dia == diasDaSemana[5] && <Button variant="contained">{consulta.Dia}</Button>}
                                </TableRow>
                                )
                            })}
                            </TableCell>
                            <TableCell>
                            {consultas.map((consulta) => {

                            return (
                                <TableRow
                                key={consulta.id}

                                >
                                {consulta.Dia == diasDaSemana[6] && <Button variant="contained">{consulta.Dia}</Button>}
                                </TableRow>
                                )
                            })}
                            </TableCell>     
                    </TableBody>
                </Table>
            </TableContainer>
        </>
       
    )
    
}
