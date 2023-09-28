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
import FormEdit from '../componentes/FormEdit'
import Buscar from '../componentes/Buscar'
import Grid from '@mui/material/Grid'
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { Button } from '@mui/material';
import { Typography } from '@mui/material';
import { createSvgIcon } from '@mui/material/utils';
import { Nav } from '../componentes/Nav';

import { useEffect } from "react";

import { getMedicos, createMedico, updateMedico, deleteMedico, getByCRM } from '../services/medico-service'


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



export function MedicosMui() {
  const navigate=useNavigate()
  const estrutura = {
    nome: "",
    CPF: "",
    CRM: "",
    email: "",
    nascimento: "",
    naturalidade: "",
  }


  useEffect(() => {
    findMedicos()
  }, []);

  const columns = [
    { id: 'nome', label: 'Nome', minWidth: 100 },
    { id: 'CPF', label: 'CPF', minWidth: 100 },
    { id: 'email', label: 'Email', minWidth: 100 },
    {
      id: 'CRM',
      label: 'CRM',
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

  async function findMedicos() {
    
    try {
      const result = await getMedicos();
      setRows(result.data)
      console.log(rows)

    } catch (error) {
      alert(error.response.data.error)
      navigate('/')
    }
  }
  async function findByCRM(CRM) {
    try {
      const result = await getByCRM(CRM);
      console.log(result)
      return result
    } catch (error) {
      setOpen(true);
      setErro(error.response.data.error)
      return undefined
    }
  }

  async function addMedico(data) {
    try {
      await createMedico(data);
      await findMedicos();
      setMensagem('Médico criado com sucesso')
      setOpen(true)
    } catch (error) {
      setOpen(true);
      setErro(error.response.data.error)
    }
  }
  async function editMedico(data) {
    try {
      await updateMedico({
        id: data.id,
        CPF: data.CPF,
        nome: data.nome,
        CRM: data.CRM,
        nascimento: data.nascimento,
        naturalidade: data.naturalidade,
        email: data.email
      });
      await findMedicos();
      setMensagem('Médico atualizado com sucesso')
      setOpen(true)
    } catch (error) {
      setOpen(true);
      setErro(error.response.data.error)
    }
  }
  async function removeMedico(id) {
    try {
      await deleteMedico(id);
      await findMedicos();
      setMensagem('Médico deletado com sucesso')
      setOpen(true)
    } catch (error) {
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
                        <Typography sx={{ px: 3 }} textAlign="center">
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
      <Paper sx={{ mt: 10,  width: {xs:'100%', sm:'100%',xl:'70%',lg:'70%'}, height: '100%', overflow: 'scroll' }}>

        <Grid
          sx={{ ml: 2, gap: 2 }}
          container
          direction="row"
          justifyContent="start"
          alignItems="center"
        >
          <Buscar funcao={findByCRM} editar={editMedico} deletar={removeMedico} coluna='CRM' > </Buscar>
          <FormEdit noData funcao={addMedico} ignore='id' icone={<PlusIcon />} chaves={Object.keys(estrutura)} texto='Adicionar Medico'> </FormEdit>
        </Grid>

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
                    <TableRow hover role="checkbox" tabIndex={-1} key={`item${row.id}`}>
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
                      <TableCell >
                        <FormEdit deletar={async () => removeMedico(row.id)} funcao={editMedico} ignore='id' texto='Editar' obj={row} chaves={Object.keys(row)}></FormEdit>
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
      </Paper>
    </>
  );
}