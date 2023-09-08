import * as React from 'react';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import '../App.css'

export function SelecionaData() {
    function primeiroDia(dia){
      console.log(dia.$d.getDate())
      console.log(dia.$d.getDay())
    const diaDaSemana = dia.$d.getDay()
    dia.$d.setDate(dia.$d.getDate() - diaDaSemana)
    console.log(dia.$d)
}
  return (

      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DemoContainer components={['DatePicker']}>
          <DatePicker
           onChange={(novoValor) => {
            primeiroDia(novoValor)
          }}
          format="DD-MM-YYYY"
          label="Data" />
        </DemoContainer>
      </LocalizationProvider>
    
  );
}