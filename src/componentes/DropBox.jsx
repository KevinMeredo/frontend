import * as React from 'react';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

export default function SelectAutoWidth() {
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
          <MenuItem value={20}>
            Todos os Médicos
          </MenuItem>
          <MenuItem value={10}>Dr Fulano</MenuItem>
          <MenuItem value={21}>Dr Ciclano</MenuItem>
          <MenuItem value={22}>Dr Beltrano</MenuItem>
        </Select>
      </FormControl>
    </div>
  );
}