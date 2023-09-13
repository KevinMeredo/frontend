import  Paper  from '@mui/material/Paper';
import { Nav } from "../componentes/Nav";
import Button from '@mui/material/Button';
import Table from '@mui/material/Table';
import TableHead from '@mui/material/TableHead';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableRow from '@mui/material/TableRow';
import Grid from '@mui/material/Grid';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { createSvgIcon } from '@mui/material';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';

import * as React from 'react';
import '../App.css'

import { useEffect, useState } from "react";
import Dados from '../Consultas_dados.json'
import Buscar from '../componentes/Buscar';

const PlusIcon = createSvgIcon(
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={1.5}
      stroke="currentColor"
    >
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
    </svg>,
    'Plus',
  );

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
            <Paper elevation={0} sx={{ overflow: 'hidden' }}> 
            <Grid 
                gap={4}
                container
                direction="row"
                justifyContent="space-evenly"
                alignItems="center"
            >          
                <Buscar coluna='Paciente'></Buscar>
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
                <Button sx={{ gap: 2 }} variant="contained">Dr. não sei o que<ArrowDropDownIcon/></Button>
                <Button sx={{ gap: 2 }} variant="contained"> <PlusIcon />  Adicionar Agendamento</Button>
            </Grid>
            </Paper>
            <TableContainer sx={{ maxHeight: 440 }}>
                <Table stickyHeader aria-label="sticky table">
                    <TableHead>
                        <TableRow>
                            <TableCell align = 'center'> Domingo</TableCell>
                            <TableCell align = 'center'> Segunda</TableCell>
                            <TableCell align = 'center'> Terça</TableCell>
                            <TableCell align = 'center'> Quarta</TableCell>
                            <TableCell align = 'center'> Quinta</TableCell>
                            <TableCell align = 'center'> Sexta</TableCell>
                            <TableCell align = 'center'> Sábado</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                            <TableCell align = 'center'>
                            {consultas.map((consulta) => {
                               return (
                                <Paper elevation={0}
                                key={consulta.id}
                                >
                                {consulta.Dia === diasDaSemana[0] && <Button size='medium' variant="contained">{consulta.Dia}</Button>}
                                </Paper>
                                )
                            })}
                            </TableCell>
                            <TableCell  align = 'center'>
                            {consultas.map((consulta) => {
                                return (
                                <Paper elevation={0} key={consulta.id}>
                                    {consulta.Dia === diasDaSemana[1] && <Button variant="contained">{consulta.Dia}</Button>}
                                </Paper>
                                )
                            })}
                            </TableCell>
                            <TableCell  align = 'center'>
                                 {consultas.map((consulta) => {

                               return (
                                <Paper elevation={0} key={consulta.id}>
                                    {consulta.Dia === diasDaSemana[2] && <Button variant="contained">{consulta.Dia}</Button>}
                                </Paper>
                                )
                            })}
                            </TableCell>
                            <TableCell  align = 'center'>
                            {consultas.map((consulta) => {

                                return (
                                <Paper elevation={0} key={consulta.id}>
                                    {consulta.Dia === diasDaSemana[3] && <Button variant="contained">{consulta.Dia}</Button>}
                                </Paper>
                                )
                            })}
                            </TableCell>
                            <TableCell  align = 'center'>
                            {consultas.map((consulta) => {

                                return (
                                <Paper elevation={0} key={consulta.id}>
                                    {consulta.Dia === diasDaSemana[4] && <Button variant="contained">{consulta.Dia}</Button>}
                                </Paper>
                                )
                            })}
                            </TableCell>
                            <TableCell  align = 'center'>
                            {consultas.map((consulta) => {

                                return (
                                <Paper elevation={0} key={consulta.id}>
                                    {consulta.Dia === diasDaSemana[5] && <Button variant="contained">{consulta.Dia}</Button>}
                                </Paper>
                                )
                            })}
                            </TableCell>
                            <TableCell  align = 'center'>
                            {consultas.map((consulta) => {

                            return (
                                <Paper elevation={0} key={consulta.id}>
                                    {consulta.Dia === diasDaSemana[6] && <Button variant="contained">{consulta.Dia}</Button>}
                                </Paper>
                                )
                            })}
                            </TableCell>     
                    </TableBody>
                </Table>
            </TableContainer>
        </>
       
    )
    
}
