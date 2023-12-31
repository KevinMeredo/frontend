import * as React from 'react';
import '../App.css'
import { useNavigate } from 'react-router-dom';
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
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { Button } from '@mui/material';
import { Typography } from '@mui/material';
import Grid from '@mui/material/Grid'
import { createSvgIcon } from '@mui/material/utils';
import { Nav } from '../componentes/Nav';

import { useEffect } from "react";

import { getPacientes, getByCPF, createPaciente, updatePaciente, deletePaciente } from '../services/paciente-service'

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

  const navigate=useNavigate()
  const estrutura = {
    nome: "",
    CPF: "",
    RG: "",
    email: "",
    nascimento: "",
    naturalidade: "",
  }

  useEffect(() => {
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
  const [mensagem, setMensagem] = React.useState()
  const [erro, setErro] = React.useState()
  const [open, setOpen] = React.useState(false)
  const [rows, setRows] = React.useState([''])
  const [page, setPage] = React.useState(0);

  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  async function findPacientes() {
    try {
      const result = await getPacientes();
      setRows(result.data)

    } catch (error) {
      console.error(error);
      alert(error.response.data.error)
      navigate('/')
    }
  }

  async function findByCPF(CPF) {
    try {
      const result = await getByCPF(CPF);
      console.log(result)
      return result
    } catch (error) {
      setOpen(true);
      setErro(error.response.data.error);
      console.error(error);
    }
  }
  async function addPaciente(data) {
    console.log(data)
    try {
      await createPaciente(data);
      await findPacientes();
      setMensagem('Paciente criado com sucesso')
      setOpen(true)
    } catch (error) {
      setOpen(true);
      setErro(error.response.data.error)
      console.error(error);
    }
  }
  async function editPaciente(data) {
    try {
      await updatePaciente({
        id: data.id,
        CPF: data.CPF,
        nome: data.nome,
        RG: data.RG,
        nascimento: data.nascimento,
        naturalidade: data.naturalidade,
        email: data.email
      });
      await findPacientes();
      setMensagem('Paciente atualizado com sucesso')
      setOpen(true)
    } catch (error) {
      console.error(error);
      setOpen(true);
      setErro(error.response.data.error)
    }
  }
  async function removePaciente(id) {
    try {
      await deletePaciente(id);
      await findPacientes();
      setMensagem('Paciente deletado com sucesso')
      setOpen(true)
    } catch (error) {
      console.error(error);
      setOpen(true);
      setErro(error.response.data.error)
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
    <>
      {erro ?
                (<Dialog open={open} onClose={() => { setOpen(false) }}>
                    <DialogTitle>ERRO: </DialogTitle>
                    <DialogContent>
                        <Typography sx={{ px: 3 }} color={'error'} textAlign="center">
                            {erro}
                        </Typography>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={() => { setOpen(false) }}>Fechar</Button>
                    </DialogActions>
                </Dialog>) :

                <Dialog open={open} onClose={() => { setOpen(false) }}>
                    <DialogTitle>Sucesso: </DialogTitle>
                    <DialogContent>
                        <Typography sx={{ px: 3 }} textAlign="center">
                            {mensagem}
                        </Typography>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={() => { setOpen(false) }}>Fechar</Button>
                    </DialogActions>
                </Dialog>}

      <Nav></Nav>
      <Paper sx={{ mt: 10, width: {xs:'100%', sm:'100%',xl:'70%',lg:'70%'}, height: '100%', overflow: 'auto' }}>
        <Grid
          sx={{ ml: 2, gap: 2 }}
          container
          direction="row"
          justifyContent="start"
          alignItems="center"
        >
          <Buscar coluna='CPF' funcao={findByCPF} editar={editPaciente} deletar={removePaciente}></Buscar>
          <FormEdit funcao={addPaciente} ignore='id' icone={<PlusIcon />} chaves={Object.keys(estrutura)} texto='Adicionar Paciente'> </FormEdit>

          <TableContainer sx={{ maxHeight: 440 }}>
            <Table stickyHeader aria-label="sticky table">
              <TableHead>
                <TableRow key={'head'}>
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
                      <TableRow hover role="checkbox" tabIndex={-1} key={row.id ? row.id : 'a'}>
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
                        <TableCell key={row.id +'1'}>
                          <FormEdit deletar={async () => removePaciente(row.id)} funcao={editPaciente} ignore='id' texto='Editar' obj={row} chaves={Object.keys(row)}></FormEdit>

                        </TableCell>
                      </TableRow>
                    );
                  })}
              </TableBody>
            </Table>
          </TableContainer>
          <TablePagination
            sx={{ mb: 2, position: 'fixed', bottom: 0 }}
            rowsPerPageOptions={[10, 25, 100]}
            component="div"
            count={rows.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </Grid>
      </Paper>
    </>

  );
}