import * as React from 'react';
import Box from '@mui/material/Box';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import FormEdit from './FormEdit';
import { Paper, Typography } from '@mui/material';
import { FixedSizeList } from 'react-window';
import { getConsultas, updateConsulta, deleteConsulta } from '../services/consulta-service';

import { getPacientes } from '../services/paciente-service';

export default function Lista(props) {
    const [Dados, setDados] = React.useState([''])
    const [paciente, setPaciente] = React.useState({ CPF: '' })
    React.useEffect(() => {
        findPacientes()
    }, [])

    async function findPacientes() {
        try {
            const result = await getPacientes();
            console.log(result.data)
            let pacienteFiltrado = result.data.filter(
                (paciente) => {
                    console.log(paciente)
                    return (paciente.nome === props.nome)
                }
            )

            const resultConsulta = await getConsultas();
            let DadoFiltrado = resultConsulta.data.filter(
                (consulta) => {
                    console.log(pacienteFiltrado[0].CPF, consulta)
                    return (pacienteFiltrado[0].CPF === consulta.CPF_Paciente)
                }

            )
            console.log("Antes do set", DadoFiltrado);
            setDados(DadoFiltrado)
            console.log(Dados)

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
        <Box
            sx={{ width: '100%', height: '80%', maxWidth: 400,flexDirection: 'column', bgcolor: 'background.paper' }}
        >
            <Typography sx={{ px:0 }} textAlign="center">
                Consultas
            </Typography>
                {Dados.map((consulta) => {
                    console.log(consulta)
                    return (
                        <Paper sx={{ maxWidth: 200 }} elevation={0}
                            key={`${consulta.id}` + '1'}
                        >
                            {<FormEdit key={consulta.id} getAll={findPacientes} deletar={async () => removeConsulta(consulta.id)} funcao={editConsulta} ignore='id' obj={consulta} chaves={Object.keys(consulta)} texto={consulta.dia}></FormEdit>}
                        </Paper>
                    )
                })}


        </Box>
    );
}