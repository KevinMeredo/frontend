import Paper from '@mui/material/Paper';
import { Nav } from "../componentes/Nav";
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
import FormEdit from '../componentes/FormEdit'
import DropBox from '../componentes/DropBox';



import * as React from 'react';
import '../App.css'

import { useEffect, useState } from "react";
import Buscar from '../componentes/Buscar';
import { useNavigate } from "react-router-dom";
import { createConsulta,getConsultas, updateConsulta, deleteConsulta } from '../services/consulta-service';


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

export function Agenda() {

    const [Dados, setDados] = useState([''])
    const [consultas, setConsultas] = useState([]);
    const [diasDaSemana, setDiasDaSemana] = useState([])

    const navigate = useNavigate();

    useEffect(() => {
        findConsultas()
    }, []);

    async function findConsultas() {
        try {
            const result = await getConsultas();
            setDados(result.data);
            console.log(result.data)
        } catch (error) {
            console.error(error);
            navigate('/');
        }
    }

    async function removeConsulta(id) {
        try {
            await deleteConsulta(id);
            await findConsultas();
        } catch (error) {
            console.error(error);
        }
    }

    async function addConsulta(data) {
        try {
            await createConsulta(data);
            await findConsultas();
        } catch (error) {
            console.error(error);
        }
    }

    async function editConsulta(data) {
        try {
            await updateConsulta({
                id: data.id,
                nameConsulta: data.nameConsulta,
                unity: data.unity
            });
            await findConsultas();
        } catch (error) {
            console.error(error);
        }
    }

    async function setConsultasSemana(diasDaSemana) {
        setDiasDaSemana(diasDaSemana)
        await setConsultas(
            Dados.filter(
                function (Dados) {
                    return (diasDaSemana.includes(Dados.dia))
                }

            ))
    };
    function getSemana(data) {
        let mes
        let dia
        const diasDaSemana = []
        let diaDaSemana = data.$d.getDay()
        data.$d.setDate(data.$d.getDate() - diaDaSemana - 1)
        for (let i = 0; i < 7; i++) {

            data.$d.setDate(data.$d.getDate() + 1)
            
            dia = data.$d.getDate()
            mes = data.$d.getMonth() + 1
            if (data.$d.getDate()<10) {
                dia = `0${dia}`;
            }
            
            if (data.$d.getMonth() < 9) {
                mes = `0${mes}`;
            }
            diasDaSemana.push(`${data.$d.getFullYear()}-${mes}-${dia}`)
        }
        setConsultasSemana(diasDaSemana)
    }
    return (
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

                    <DropBox></DropBox>

                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DemoContainer components={['DatePicker']}>
                            <DatePicker
                                onChange={(novoValor) => {
                                    getSemana(novoValor)
                                }}
                                format="DD/MM/YYYY"
                                label="Data"
                            />
                        </DemoContainer>
                    </LocalizationProvider>

                    <FormEdit icone={<PlusIcon />} chaves={Object.keys(Dados[0])} texto='Adicionar Agendamento'> </FormEdit>

                </Grid>
            </Paper>
            <TableContainer sx={{ maxHeight: 440 }}>
                <Table stickyHeader aria-label="sticky table">
                    <TableHead>
                        <TableRow>
                            <TableCell align='center'> Domingo</TableCell>
                            <TableCell align='center'> Segunda</TableCell>
                            <TableCell align='center'> Terça</TableCell>
                            <TableCell align='center'> Quarta</TableCell>
                            <TableCell align='center'> Quinta</TableCell>
                            <TableCell align='center'> Sexta</TableCell>
                            <TableCell align='center'> Sábado</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        <TableCell align='center'>
                            {consultas.map((consulta) => {
                                return (
                                    <Paper elevation={0}
                                        key={consulta.id}
                                    >
                                        {consulta.dia === diasDaSemana[0] && <FormEdit ignore= 'id' chaves={Object.keys(consulta)} texto={consulta.dia}></FormEdit>}
                                    </Paper>
                                )
                            })}
                        </TableCell>
                        <TableCell align='center'>
                            {consultas.map((consulta) => {
                                return (
                                    <Paper elevation={0} key={consulta.id}>
                                        {consulta.dia === diasDaSemana[1] && <FormEdit ignore= 'id' chaves={Object.keys(consulta)} texto={consulta.dia}></FormEdit>}
                                    </Paper>
                                )
                            })}
                        </TableCell>
                        <TableCell align='center'>
                            {consultas.map((consulta) => {

                                return (
                                    <Paper elevation={0} key={consulta.id}>
                                        {consulta.dia === diasDaSemana[2] && <FormEdit ignore= 'id' chaves={Object.keys(consulta)} texto={consulta.dia}></FormEdit>}
                                    </Paper>
                                )
                            })}
                        </TableCell>
                        <TableCell align='center'>
                            {consultas.map((consulta) => {

                                return (
                                    <Paper elevation={0} key={consulta.id}>
                                        {consulta.dia === diasDaSemana[3] && <FormEdit ignore= 'id' chaves={Object.keys(consulta)} texto={consulta.dia}></FormEdit>}
                                    </Paper>
                                )
                            })}
                        </TableCell>
                        <TableCell align='center'>
                            {consultas.map((consulta) => {

                                return (
                                    <Paper elevation={0} key={consulta.id}>
                                        {consulta.dia === diasDaSemana[4] && <FormEdit ignore= 'id' chaves={Object.keys(consulta)} texto={consulta.dia}></FormEdit>}
                                    </Paper>
                                )
                            })}
                        </TableCell>
                        <TableCell align='center'>
                            {consultas.map((consulta) => {

                                return (
                                    <Paper elevation={0} key={consulta.id}>
                                        {consulta.dia === diasDaSemana[5] && <FormEdit ignore= 'id' chaves={Object.keys(consulta)} texto={consulta.dia}></FormEdit>}
                                    </Paper>
                                )
                            })}
                        </TableCell>
                        <TableCell align='center'>
                            {consultas.map((consulta) => {

                                return (
                                    <Paper elevation={0} key={consulta.id}>
                                        {consulta.dia === diasDaSemana[6] && <FormEdit ignore= 'id' chaves={Object.keys(consulta)} texto={consulta.dia}></FormEdit>}
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
