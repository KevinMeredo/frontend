import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

export default function FormDialog() {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Button variant="outlined" onClick={handleClickOpen}>
        Editar
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Editar</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            id="Nome"
            label="Nome"
            fullWidth
            variant="standard"
          />
          <TextField
            autoFocus
            margin="dense"
            id="CPF"
            label="CPF"
            fullWidth
            variant="standard"
          />
            <TextField
            autoFocus
            margin="dense"
            id="CRM/RG"
            label="CRM/RG"
            fullWidth
            variant="standard"
          />
          <TextField
            autoFocus
            margin="dense"
            id="DataNas"
            label="Data de Nascimento"
            fullWidth
            variant="standard"
          />
          <TextField
            autoFocus
            margin="dense"
            id="Naturalidade"
            label="Naturalidade"
            fullWidth
            variant="standard"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancelar</Button>
          <Button onClick={handleClose}>Concluir</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}