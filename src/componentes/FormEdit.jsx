import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import ModalConfirmacao from '../componentes/ModalConfirmacao'
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Typography from '@mui/material/Typography';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import dayjs from 'dayjs';
import { FormHelperText } from '@mui/material';

export default function FormEdit(props) {
  const [open, setOpen] = React.useState(false);
  const [Dados, setDados] = React.useState({ id: '' })
  const [tabela, setTabela] = React.useState({ id: '' })
  const [error, setError] = React.useState(false); // State to track error

  const numericPattern = /^[0-9]*$/; // Regular expression for numeric input only
  let padrao
  let chaves = ''
  let podeAbrir = true
  const mudaDado = async (mudanca, key, id) => {
    let novoDado = Dados
    novoDado['id'] = id
    if (Object.keys(Dados).length !== 0) {
      Object.keys(Dados).forEach((chave) => {
        if (chave === key) {
          novoDado[chave] = mudanca
        } else if (novoDado[key]) {
          novoDado[chave] = Dados[chave]
        } else {
          novoDado[key] = mudanca
        }
        if (key === 'CPF' || key === 'CPF_Paciente') {
          if ((numericPattern.test(novoDado[key]) && VerificaCPF(novoDado[key])) || novoDado === '') {
            setDados(novoDado)
            setError(false); // Clear the error if input is valid
          } else {
            setError(true)
          }
        } else {
          setDados(novoDado)
        }

      })
    } else {
      if (key === 'CPF' || key === 'CPF_Paciente') {
        if (VerificaCPF(novoDado[key]) || novoDado === '') {
          setDados(novoDado)
          setError(false); // Clear the error if input is valid
        } else {
          setError(true)
        }
      } else {
        setDados(novoDado)
      }
    }

  }

  if (tabela) {
    if (props.noData) {
      padrao = tabela
    } else if (props.obj) {

      padrao = props.obj
    } else {
      padrao = tabela
    }

  } else {
    padrao = ''
  }
  if (props.chaves) {
    chaves = props.chaves
    podeAbrir = true
  } else {
    try {

      chaves = Object.keys(tabela)
      if (chaves) podeAbrir = true

    }
    catch (error) {
      console.log(error)
      chaves = ''
      podeAbrir = false
    }
  }
  function VerificaCPF(CPF) {

    var soma;
    var resto;
    soma = 0;
    if (CPF === "00000000000") {
      return false;
    }

    for (let i = 1; i <= 9; i++) {
      soma = soma + parseInt(CPF.substring(i - 1, i)) * (11 - i);
    }

    resto = soma % 11;

    if (resto === 10 || resto === 11 || resto < 2) {
      resto = 0;
    } else {
      resto = 11 - resto;
    }

    if (resto !== parseInt(CPF.substring(9, 10))) {
      return false;
    }

    soma = 0;

    for (let i = 1; i <= 10; i++) {
      soma = soma + parseInt(CPF.substring(i - 1, i)) * (12 - i);
    }
    resto = soma % 11;

    if (resto === 10 || resto === 11 || resto < 2) {
      resto = 0;
    } else {
      resto = 11 - resto;
    }

    if (resto !== parseInt(CPF.substring(10, 11))) {
      return false;
    }

    return true;
  }
  const handleClickOpen = async () => {
    if (props.executa) {
      let tab = await props.executa()
      setTabela(tab)
    }

    if (tabela !== undefined && Object.keys(tabela).length !== 0) {
      if (Object.keys(tabela).length !== 0 && podeAbrir) {
        if (props.getAll) {
          await props.getAll().then(
            () => setOpen(true)
          )
        } else {
          setOpen(true)
        }
      }
    } else if (tabela) {
      if (chaves.length !== 0) {
        if (props.getAll) {
          await props.getAll().then(
            () => setOpen(true)
          )
        } else {
          setOpen(true)
        }
      }

    }

  };

  const handleClose = async () => {
    setError(false)
    if (props.getAll) {
      await props.getAll().then(
        () => setOpen(false)
      )
    } else {
      setOpen(false)
    }


  };

  const ExecutaEFecha = async () => {
    try {
      if (!error) {
        await props.funcao(Dados)
        await handleClose()
      }
    } catch (error) {
      console.log(error)
    }


  }

  return (
    <div>
      <Button sx={{ gap: 2 }} variant="contained" disabled={error}onClick={handleClickOpen}>
        {props.icone && props.icone}
        {props.texto && props.texto}
      </Button>
      {chaves &&
        <Dialog open={open} onClose={handleClose}>
          <DialogTitle>{props.texto}</DialogTitle>
          <DialogContent>
            {chaves.length !== 0 && chaves.map((key) => {

              if (key === 'CPF' || key === 'CPF_Paciente') {
                return (
                  <>
                    <TextField

                      key={key}
                      InputProps={{
                        inputProps: {
                          pattern: '[0-9]*',
                          message:'Digite Apenas os 11 números'
                        },
                      }}
                      autoFocus
                      margin='dense'
                      id={key}
                      label={key}
                      defaultValue={padrao[key]}
                      fullWidth
                      required
                      error={error} // Set the error state
                      variant='standard'
                      onChange={(event) => {
                        mudaDado(event.target.value, key, padrao[props.ignore]);
                      }}
                    ></TextField>
                    {error && <FormHelperText error>CPF invalido, escreva apenas os 11 números  do CPF</FormHelperText>}
                  </>
                )
              } else if (key == 'CRM_Medico') {
                return (<>
                  {props.medicos &&
                    <FormControl key={-1} sx={{ m: 1, minWidth: 100 }} >
                      <InputLabel >Medico</InputLabel>
                      <Select
                        labelId="demo-simple-select-autowidth-label"
                        id="demo-simple-select-autowidth"
                        autoWidth
                        onChange={(event) => {
                          mudaDado(event.target.value, key, padrao[props.ignore]);
                        }}
                        label="Medico"
                      >
                        {props.medicos.map(
                          (medico, key) =>
                            <MenuItem key={key} value={medico.CRM}>{medico.nome}</MenuItem>
                        )}
                      </Select>
                    </FormControl>}
                </>)
              } else if (key !== props.ignore && key !== 'nascimento' && key !== 'dia' && padrao[key] !== props.texto) {
                return (
                  <TextField
                    required
                    key={key}
                    autoFocus
                    margin='dense'
                    id={key}
                    label={key}
                    defaultValue={padrao[key]}
                    fullWidth
                    variant='standard'
                    onChange={(event) => {
                      mudaDado(event.target.value, key, padrao[props.ignore]);
                    }}
                  ></TextField>
                )
              } else if (key !== props.ignore && padrao[key] !== props.texto) {
                return (
                  <LocalizationProvider key={key + '2'} dateAdapter={AdapterDayjs}>
                    <DemoContainer key={key + '1'} components={['DatePicker']}>
                      <DatePicker
                        label={key}
                        key={key}
                        onChange={(value) => {
                          mudaDado(value, key, padrao[props.ignore]);
                        }}
                        defaultValue={dayjs(padrao[key])}
                      />
                    </DemoContainer>
                  </LocalizationProvider>
                )

              }

            })}
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>Cancelar</Button>
            {props.deletar && <ModalConfirmacao texto='deletar' funcao={props.deletar} />}
            <Button onClick={ExecutaEFecha}>Salvar</Button>
          </DialogActions>
        </Dialog>}
    </div>
  );
}