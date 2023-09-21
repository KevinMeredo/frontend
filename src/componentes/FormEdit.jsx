import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import ModalConfirmacao from '../componentes/ModalConfirmacao'

export default function FormEdit(props) {
  const [open, setOpen] = React.useState(false);
  const [Dados, setDados] = React.useState({ id: '' })

  let padrao

  const mudaDado = async (mudanca, key, id) => {
    let novoDado = Dados
    novoDado['id'] = id
    if (Object.keys(Dados).length !== 0) {
      console.log(Dados)
      Object.keys(Dados).forEach((chave) => {
        if (chave == key) {
          novoDado[chave] = mudanca
        } else if (novoDado[key]) {
          novoDado[chave] = Dados[chave]
        } else {
          novoDado[key] = mudanca
        }
        setDados(novoDado)
      })
    } else {
      novoDado[key] = mudanca
      setDados(novoDado)
      console.log(Dados)
    }

  }
  if (props.obj) {
    padrao = props.obj
  } else {
    padrao = ''
  }
  const handleClickOpen = async () => {
    if (props.executa) {
      await props.executa().then(
        
      )
      console.log(props)
    }
    if(props.obj){
      console.log(props)
      if(Object.keys(props.obj).length !==0){
        setOpen(true);
      }
    } else {
      setOpen(true);
    }

    
  };

  const handleClose = async () => {
    if (props.getAll) {
      await props.getAll().then(
        () => setOpen(false)
      )
    } else {
      setOpen(false)
    }


  };

  const ExecutaEFecha = async () => {
    console.log(props)
    await props.funcao(Dados)
    await handleClose()
  }

  return (
    <div>
      <Button sx={{ gap: 2 }} variant="contained" onClick={handleClickOpen}>
        {props.icone && props.icone}
        {props.texto && props.texto}
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>{props.texto}</DialogTitle>
        <DialogContent>
          {props.chaves && props.chaves.map((key) => {
            if (key !== props.ignore) {
              return (
                <TextField
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
            }


          })}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancelar</Button>
          {props.deletar && <ModalConfirmacao texto='deletar' funcao={props.deletar} />}
          <Button onClick={ExecutaEFecha}>Salvar</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}