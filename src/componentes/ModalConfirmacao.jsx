import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

export default function AlertDialog(props) {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const ExecutaEFecha = async () => {
    await props.funcao()
    handleClose()
  }
  return (
    <div>
      <Button color='error' variant="outlined" onClick={handleClickOpen}>
        {props.texto}
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Tem certeza?"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="confirmacao">
            Essa ação não poderá ser revertida
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancelar</Button>
          <Button onClick={ExecutaEFecha} autoFocus>
            DELETAR
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}