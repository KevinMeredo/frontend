import * as React from 'react';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

export default function DropBox(props) {
  const [Medico, setMedico] = React.useState('');

  const handleChange = (event) => {
    setMedico(event.target.value);
  };

  return (
    <div>
      <FormControl sx={{ m: 1, minWidth: 100 }}>
        <InputLabel id="demo-simple-select-autowidth-label">Medico</InputLabel>
        <Select
          labelId="demo-simple-select-autowidth-label"
          id="demo-simple-select-autowidth"
          value={Medico}
          onChange={handleChange}
          autoWidth
          label="Medico"
        >
          <MenuItem key={-1}value={-1}>
            Qualquer Médico
          </MenuItem>
          {props.medicos.map(
            ( medico, key) => 
              <MenuItem key={key} value={key}>{medico.nome}</MenuItem>
            )}
        </Select>
      </FormControl>
    </div>
  );
}