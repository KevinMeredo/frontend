import * as React from 'react';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { Button } from '@mui/material';
import { Paper, Typography } from '@mui/material';
export default function ERRO(props) {
    const [open, setOpen] = React.useState(true);
    const handleClose = async () => {
        setOpen(false)
    };
    return (
        <>
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>titulo</DialogTitle>
                <DialogContent>
                    <Typography sx={{ px: 30 }} textAlign="center">
                        {props.texto}
                    </Typography>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Fechar</Button>
                </DialogActions>
            </Dialog>
        </>
    )

}