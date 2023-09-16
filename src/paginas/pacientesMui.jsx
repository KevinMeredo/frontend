import * as React from 'react';
import '../App.css'
import Table from '@mui/material/Table';
import TableHead from '@mui/material/TableHead';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import FormEdit from '../componentes/FormEdit';
import Buscar from '../componentes/Buscar';
import Grid from '@mui/material/Grid'
import { createSvgIcon } from '@mui/material/utils';
import { Nav } from '../componentes/Nav';

import { useEffect } from "react";
import { useNavigate } from 'react-router-dom';

import {getPacientes} from '../services/paciente-service'

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
export function PacientesMui() {
  const navigate = useNavigate();

  useEffect(  () => {
     findPacientes()
  }, []);

  const columns = [
    { id: 'nome', label: 'Nome', minWidth: 100 },
    { id: 'CPF', label: 'CPF', minWidth: 100 },
    { id: 'email', label: 'Email', minWidth: 100 },
    {
      id: 'RG',
      label: 'RG',
      minWidth: 100,
      align: 'left',
    },
    {
      id: 'nascimento',
      label: 'Data de Nascimento',
      minWidth: 100,
      align: 'left',
    },
    {
      id: 'naturalidade',
      label: 'Naturalidade',
      minWidth: 100,
      align: 'left',
      format: (value) => value.toFixed(2),
    },
  ];
  const [rows, setRows] = React.useState([''])
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  async function findPacientes() {
    try {
      const result = await getPacientes();
      setRows(result.data)
      console.log( rows)
      
    } catch (error) {
      console.error(error);
      navigate('/');
    } 
  }
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  return (
    <Paper sx={{ width: '100%', overflow: 'hidden' }}>
      <Nav></Nav>
      <Grid
        container
        direction="row"
        justifyContent="space-evenly"
        alignItems="center"
      >
        <Buscar coluna= 'CRF'></Buscar>
        <FormEdit ignore='id' icone = {<PlusIcon />} chaves={Object.keys(rows[0])} texto='Adicionar Paciente'> </FormEdit>
      </Grid>
      <TableContainer sx={{ maxHeight: 440 }}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell
                  key={column.id}
                  align={column.align}
                  style={{ minWidth: column.minWidth }}
                >
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {rows
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row) => {
                return (
                  <TableRow hover role="checkbox" tabIndex={-1} key={row.code}>
                    {columns.map((column) => {
                      const value = row[column.id];
                      return (
                        <TableCell key={column.id} align={column.align}>
                          {column.format && typeof value === 'number'
                            ? column.format(value)
                            : value}
                        </TableCell>
                      );
                    })}
                    <FormEdit ignore='id' texto='Editar' chaves = {Object.keys(row)}></FormEdit>
                  </TableRow>
                );
              })}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[10, 25, 100]}
        component="div"
        count={rows.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
  );
}