import * as React from 'react';
import Box from '@mui/material/Box';
import FormEdit from './FormEdit';
import { Paper, Typography } from '@mui/material';
import { getConsultas, updateConsulta, deleteConsulta } from '../services/consulta-service';

import { getPacientes } from '../services/paciente-service';
import { getMedicos } from '../services/medico-service'

export default function Lista(props) {
    const [Dados, setDados] = React.useState([''])
    const [medicos, setMedicos] = React.useState([])
    React.useEffect(() => {
        findPacientes()
        findMedicos()
    }, [])

    async function findPacientes() {
        try {
            const result = await getPacientes();
            console.log(result.data)
            let pacienteFiltrado = result.data.filter(
                (paciente) => {
                    console.log(paciente)
                    if (paciente.nome.toLowerCase().indexOf(props.nome.toLowerCase()) !== -1) return true

                    return false
                }
            )

            const resultConsulta = await getConsultas();
            let resposta
            if (pacienteFiltrado.length !== 0) {
                let DadoFiltrado = resultConsulta.data.filter(
                    (consulta) => {
                        resposta = false
                        console.log(pacienteFiltrado, consulta)

                        pacienteFiltrado.forEach((paciente) => {
                            console.log(paciente)
                            if (paciente.CPF === consulta.CPF_Paciente) {
                                console.log(paciente.nome)
                                consulta.nome = paciente.nome
                                console.log(consulta)
                                resposta = true
                            }
                        })
                        return resposta
                    }

                )
                console.log("Antes do set", DadoFiltrado);
                DadoFiltrado.sort((a, b) => {

                    if (a.dia > b.dia) return 1
                    if (b.dia > a.dia) return -1

                    return 0;
                })
                setDados(DadoFiltrado)
                console.log(Dados)

            }

        } catch (error) {
            console.error(error);
        }
    }
    async function findMedicos() {
        try {
            const result = await getMedicos();
            setMedicos(result.data)

        } catch (error) {
            alert(error.response.data.error)
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
            await findPacientes();
        } catch (error) {
            console.error(error);
        }
    }

    async function removeConsulta(id) {
        try {
            await deleteConsulta(id);
            await findPacientes();

        } catch (error) {
            console.error(error);
        }
    }
    return (
        <>
            {Dados[0] !== "" ?
                <Box
                    sx={{ width: '100%', height: '80%', maxWidth: 400, flexDirection: 'column', bgcolor: 'background.paper' }}
                >
                    <Typography sx={{ px: 0 }} textAlign="center">
                        Consultas
                    </Typography>
                    {Dados.map((consulta) => {
                        console.log(Dados)
                        return (
                            <Paper key={`${consulta.id} + '3'`} className='linha' sx={{ m:2, gap: 2, display: 'flex' }}>
                                {consulta.nome + '  '}<br />CPF do Paciente: {consulta.CPF_Paciente}    <br />
                                <Paper sx={{ maxWidth: 200 }} elevation={0}
                                    key={`${consulta.id}1`}
                                >
                                    {<FormEdit medicos={medicos} key={consulta.id} getAll={findPacientes} deletar={async () => removeConsulta(consulta.id)} funcao={editConsulta} ignore='id' obj={consulta} chaves={Object.keys(consulta)} texto={consulta.dia}></FormEdit>}
                                </Paper>
                            </Paper>

                        )
                    })}


                </Box>
                : <Typography sx={{ px: 0 }} textAlign="center">
                    Nenhum paciente com esse nome tem consultas, escreva o nome completo e verifique se está digitado corretamente
                </Typography>}

        </>
    );
}