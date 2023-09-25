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
import { useNavigate } from "react-router-dom";
import { createConsulta, getConsultas, updateConsulta, deleteConsulta } from '../services/consulta-service';
import { getByCPF, getPacientes } from '../services/paciente-service';
import { getByCRM, getMedicos } from '../services/medico-service';
import BuscarLista from '../componentes/BuscarLista';


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
    const estrutura = {
        CPF_Paciente: "",
        CRM_Medico: "",
        tipo: "",
        status: "",
        urgencia: "",
        observação: "",
        dia: "",
    }
    const [medicos, setMedicos] = useState([])
    const [medico, setMedico] = useState({})
    const [pacientes, setPacientes] = useState([])
    const [Dados, setDados] = useState([])
    const [consultas, setConsultas] = useState([]);
    const [diasDaSemana, setDiasDaSemana] = useState([])

    const navigate = useNavigate();

    useEffect(() => {
        findMedicos()
        findPacientes()
        setConsultasSemana(diasDaSemana)
    }, [Dados]);

    async function findConsultas() {
        try {
            const result = await getConsultas();
            let novoDado = await result.data.map(
                async (consulta) => {
                    console.log(consulta)
                    console.log('pacientes ', pacientes)
                    pacientes.map(
                       (paciente) => {
                        if (paciente.CPF === consulta.CPF_Paciente)
                            consulta.NomePaciente = paciente.nome
                       } 
                    )
                    
                }
            )
            console.log("Antes do set", result.data);
            setDados(result.data)
            console.log("Depois do setDados", Dados, diasDaSemana)
            console.log("novoDado", novoDado)
            setPacientes(novoDado)
            console.log(pacientes)
        } catch (error) {
            console.error(error);
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
/*     async function findByCPF(CPF) {
        try {
            const result = await getByCPF(CPF);
            console.log(result)
            return result
        } catch (error) {
            console.error(error);
        }
    } */

    async function findMedicos() {
        try {
            const result = await getMedicos();
            setMedicos(result.data)
            console.log(medicos)

        } catch (error) {
            console.error(error);
            navigate('/');
        }
    }

    async function findPacientes() {
        try {
            const result = await getPacientes();
            setPacientes(result.data)

        } catch (error) {
            console.error(error);
            navigate('/');
        }
    }
    async function addConsulta(data) {
        try {
            await createConsulta(data);
            await findConsultas();
            console.log(data)
        } catch (error) {
            console.error(error);
        }
    }

    async function editConsulta(data) {
        try {
            await updateConsulta({
                id: data.id,
                CPF_Paciente: data.CPF_Paciente,
                CRM_Medico: data.CRM_Medico,
                dia: data.dia,
                tipo: data.tipo,
                status: data.status,
                urgencia: data.urgencia,
                observação: data.observação
            });
            await findConsultas();
        } catch (error) {
            console.error(error);
        }
    }

    async function setConsultasSemana(diasDaSemana) {

        console.log("setConsultasSemana")
        setDiasDaSemana(diasDaSemana)
        setConsultas(
            Dados.filter(
                function (Dados) {
                    console.log(Dados, diasDaSemana)
                    return (diasDaSemana.includes(Dados.dia))
                }
            ))
        console.log("consultas: ", consultas)
    };
    function getSemana(data) {
        findConsultas()
        let mes
        let dia
        const diasDaSemana = []
        let diaDaSemana = data.$d.getDay()
        data.$d.setDate(data.$d.getDate() - diaDaSemana - 1)
        for (let i = 0; i < 7; i++) {

            data.$d.setDate(data.$d.getDate() + 1)

            dia = data.$d.getDate()
            mes = data.$d.getMonth() + 1
            if (data.$d.getDate() < 10) {
                dia = `0${dia}`;
            }

            if (data.$d.getMonth() < 9) {
                mes = `0${mes}`;
            }
            diasDaSemana.push(`${data.$d.getFullYear()}-${mes}-${dia}`)
        }
        console.log(diasDaSemana)
        setConsultasSemana(diasDaSemana)
    }
    return (
        <>
            <Nav></Nav>
            <Paper sx={{ mt: 10, width: '70%', height:'100%', overflow: 'scroll', maxWidth: 1200 }}>

                <Grid
                    sx={{mx: 4, gap:2} }
                    container
                    direction="row"
                    justifyContent="start"
                    alignItems="center"
                >
                    <BuscarLista  ></BuscarLista>
                    <DropBox medicos={medicos} setMedico={setMedico}></DropBox>
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

                    <FormEdit funcao={addConsulta} ignore='id' icone={<PlusIcon />} getAll={findConsultas} chaves={Object.keys(estrutura)} texto='Adicionar Agendamento'> </FormEdit>


                    <TableContainer sx={{  maxWidth: 1400 }}>
                        <Table stickyHeader aria-label="sticky table" >
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
                                <TableRow>
                                    {diasDaSemana.map((dia) => {
                                        console.log("medico: ", medico)
                                        return (
                                            <TableCell   sx={{  maxWidth: 100 }} key={dia} align='center'>
                                                {consultas.map((consulta) => {
                                                    return (
                                                        <Paper sx={{maxWidth: 200}} elevation={0}
                                                            key={consulta.id}
                                                        >
                                                            {(consulta.dia === dia && (consulta.CRM_Medico === medico.CRM || !medico.CRM)) && <FormEdit getAll={findConsultas} deletar={async () => removeConsulta(consulta.id)} funcao={editConsulta} ignore='id' obj={consulta} chaves={Object.keys(consulta)} texto={consulta.NomePaciente}></FormEdit>}
                                                        </Paper>
                                                    )
                                                })}
                                            </TableCell>
                                        )
                                    })}
                                </TableRow>

                            </TableBody>
                        </Table>
                    </TableContainer>
                </Grid>
            </Paper>
        </>

    )

}
