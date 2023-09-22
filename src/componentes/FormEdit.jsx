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
  const [tabela, setTabela] = React.useState({})

  let padrao
  let chaves
  let podeAbrir = true
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
  
  if (tabela) {
    if (props.noData) {
      padrao = tabela
      console.log(padrao)
    } else if (props.obj) {

      padrao = props.obj
      console.log(padrao, props)
    } else {
      console.log('sem obj')
      padrao = tabela
    }

  } else {
    console.log('não tem tabela')
    padrao = ''
  }
  if (props.chaves) {
    console.log('podeAbrir')
    chaves = props.chaves
    podeAbrir = true
  } else {
    try{
      chaves = Object.keys(tabela)
      console.log('podeAbrir')
      podeAbrir = true
    } 
    catch (error) {
      console.log("ERRO: ",error)
      chaves = ''
      console.log('naopodeAbrir')
      podeAbrir = false
    }
  }
  const handleClickOpen = async () => {
    if (props.executa) {
      let tabela = await props.executa()
      setTabela(tabela)
      console.log(tabela)
      console.log(props)
    
    }

    if (tabela!=undefined && Object.keys(tabela).length != 0) {
      console.log(props)
      console.log(tabela)
      console.log(Object.keys(tabela).length)
      if (Object.keys(tabela).length !== 0 && podeAbrir) {
        console.log( 'abriu')
        setOpen(true);
      }
    } else if(podeAbrir){
      console.log( 'abriu')
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
          {chaves.length !== 0 && chaves.map((key) => {
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