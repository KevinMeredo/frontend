import { Grid, Paper } from '@mui/material';
import { GraficoBarra } from '../componentes/GraficoBarra';
import { GraficoPizza } from '../componentes/GraficoPizza';
import { Nav } from '../componentes/Nav';
import * as React from 'react';

export function Painel() {
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
                    <GraficoPizza ></GraficoPizza>
                </Paper>
                <Paper sx={{ width: '80%' }}>
                    <GraficoBarra ></GraficoBarra>
                </Paper>

            </Grid>

        </>

    )
}