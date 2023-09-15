import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';


export default function FormDialog(props) {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Button sx={{ gap: 2 }} variant="contained" onClick={handleClickOpen}>
        {props.icone && props.icone}
        {props.texto}
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>{props.texto}</DialogTitle>
        <DialogContent>
          {props.chaves && props.chaves.map((key) => {
            console.log(key)
            return (
              <TextField
                autoFocus
                margin='dense'
                id={key}
                label={key}
                fullWidth
                variant='standard'
              ></TextField>
            )

          })}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancelar</Button>
          <Button onClick={handleClose}>Concluir</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}