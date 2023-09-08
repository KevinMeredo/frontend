import { SelecionaData } from "../componentes/SelecionaData";
import  Paper  from '@mui/material/Paper';
import { Nav } from "../componentes/Nav";
import Table from '@mui/material/Table';
import TableHead from '@mui/material/TableHead';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableRow from '@mui/material/TableRow';
import * as React from 'react';
import '../App.css'

export function Agenda(){
    
    return(
        <>

            <Nav classname="App-header"></Nav>
            <Paper sx={{ width: '30%', overflow: 'hidden' }}>           
                <SelecionaData ></SelecionaData>
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
                </Table>
            </TableContainer>
        </>
       
    )
    
}
