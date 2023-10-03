import * as React from 'react';
import Paper from '@mui/material/Paper';
import InputBase from '@mui/material/InputBase';
import SearchIcon from '@mui/icons-material/Search';
import FormControl from '@mui/material/FormControl';
import { FormHelperText } from '@mui/material';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Lista from './Lista';
import { Button } from '@mui/material';


export default function BuscarLista(props) {
    const [open, setOpen] = React.useState(false);
    const [valorColuna, setValorColuna] = React.useState('')
    function AbreLista(){
        setOpen(true);
    }
    function mudaValor(valor) {
        console.log(valor)
        console.log(props)
        setValorColuna(valor)

    }
    const handleClose = async () => {
          setOpen(false)
      };
    
    return (
        <Paper
            variant="outlined"
            elevation={0}
            component="form"
            sx={{ p: '2px 4px', display: 'flex', boxShadow: 0, alignItems: 'center', maxWidth: 300 }}
        >
            <FormControl defaultValue="" >
                <InputBase placeholder={`Busca por Paciente`}
                    onChange={
                        (event) => {
                            mudaValor(event.target.value);
                        }} />
                <FormHelperText />
            </FormControl>
            <Button onClick={AbreLista}><SearchIcon></SearchIcon></Button>
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>{props.texto}</DialogTitle>
                    <DialogContent>
                        <Lista nome = {valorColuna}></Lista>
                    </DialogContent>
                    <DialogActions>
          <Button onClick={handleClose}>Fechar</Button>
        </DialogActions>
      </Dialog>
        </Paper>
    )
}