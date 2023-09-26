import { Grid, Paper } from '@mui/material';
import { GraficoBarra } from '../componentes/GraficoBarra';
import { GraficoRosquinha } from '../componentes/GraficoRosquinha';
import { Nav } from '../componentes/Nav';
import * as React from 'react';
import { getMedicos } from '../services/medico-service';
import { getConsultas } from '../services/consulta-service';

export function Painel() {
    const [medicos,setMedicos] = React.useState([])
    const [consultas,setConsultas] = React.useState([])
    async function findMedicos() {
        try {
            const result = await getMedicos();
            const opcoes = result.data.map((opcao) => {
                console.log(opcao)
                return ({id:opcao.id,nome:opcao.nome,CRM:opcao.CRM})
            })
            console.log(opcoes)
            setMedicos(opcoes)
            console.log(medicos)
        } catch (error) {
            console.error(error);
        }

    }
    async function findConsultas() {
        try {
            const result = await getConsultas();

            setConsultas(result.data)
            console.log(consultas)

        } catch (error) {
            console.error(error);
        }
    }
    React.useEffect(() =>{
        findMedicos()
        findConsultas()
        },[])
    return (
        <>
            < Nav classname="App-header"></Nav>
            <Grid sx={{ py:8, width: '100%', }}
                container
                direction="column"
                justifyContent="space-between"
                alignItems="center"
            >
                <Paper sx={{width:'50%'}}>
                    <GraficoRosquinha opcoes={medicos} quantidade={consultas} ></GraficoRosquinha>
                </Paper>
                <Paper sx={{ width: '80%' }}>
                    <GraficoBarra quantidade={consultas} ></GraficoBarra>
                </Paper>

            </Grid>

        </>

    )
}