import * as React from 'react';
import Paper from '@mui/material/Paper';
import InputBase from '@mui/material/InputBase';
import IconButton from '@mui/material/IconButton';
import SearchIcon from '@mui/icons-material/Search';

export default function Buscar(props){
    return(
        <Paper 
            variant="outlined"
            component="form"
            sx={{ p: '2px 4px', display: 'flex',boxShadow: 0, alignItems: 'center', maxWidth: 300 }}
            >
            <InputBase
                sx={{ ml: 1, flex: 1 }}
                placeholder={`Buscar por ${props.coluna}`}
                inputProps={{ 'aria-label': 'Busca coluna' }}
            />
            <IconButton type="button" sx={{ p: '10px' }} aria-label="search">
                <SearchIcon />
            </IconButton>
        </Paper>
    )
}
