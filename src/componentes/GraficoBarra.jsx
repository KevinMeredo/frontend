import React from "react";
import { Chart } from "react-google-charts";

export const data = [
  ["2021 - 2023", "2021", "2022", "2023"],
  ["Janeiro", 1000, 0, 0],
  ["Fevereiro", 0, 460, 250],
  ["Março", 660, 0, 300],
  ["Abril", 1030, 540, 350],
  ["Maio", 1030, 540, 320],
  ["Junho", 1030, 540, 350],
  ["Julho", 1030, 540, 350],
  ["Agosto", 1030, 540, 350],
  ["Setembro", 1030, 540, 350],
  ["Outubro", 1030, 540, 350],
  ["Novembro", 1030, 540, 350],
  ["Dezembro", 500, 540, 350],
];

export const options = {
  chart: {
    title: "Atendimentos realizados"
  },
};

export function GraficoBarra(props) {
  let anos = []
  let dados = [['janeiro'], ['fevereiro'], ['março'], ['abril'], ['maio'], ['junho'], ['julho'], ['agosto'], ['setembro'], ['outubro'], ['novembro'], ['dezembro']]
  props.quantidade.forEach((consulta) => {
    if (!anos.includes(consulta.dia.slice(0, 4))) {
      anos.push(consulta.dia.slice(0, 4))
      for (let i = 0; i < 12; i++) {
        dados[i].push(0)
      }
    }
    anos.forEach((ano, key) => {
      switch (consulta.dia.slice(5, 7)) {
        case '01':
          if(consulta.dia.slice(0,4) === anos[key])
          [0][key + 1]++
        
          break
        case '02':
          if(consulta.dia.slice(0,4) === anos[key])
          dados[1][key + 1]++
          break
        case '03':
          if(consulta.dia.slice(0,4) === anos[key])
          dados[2][key + 1]++
          break
        case '04':
          if(consulta.dia.slice(0,4) === anos[key])
          dados[3][key + 1]++
          break
        case '05':
          if(consulta.dia.slice(0,4) === anos[key])
          dados[4][key + 1]++
          break
        case '06':
          if(consulta.dia.slice(0,4) === anos[key])
          dados[5][key + 1]++
          break
        case '07':
          if(consulta.dia.slice(0,4) === anos[key])
          dados[6][key + 1]++
          break
        case '08':
          if(consulta.dia.slice(0,4) === anos[key])
          dados[7][key + 1]++
          break
        case '09':
          if(consulta.dia.slice(0,4) === anos[key])
          dados[8][key + 1]++
          break
        case '10':
          if(consulta.dia.slice(0,4) === anos[key])
          dados[9][key + 1]++
          break
        case '11':
          if(consulta.dia.slice(0,4) === anos[key])
          dados[10][key + 1]++
          break
        case '12':
          if(consulta.dia.slice(0,4) === anos[key])
          dados[11][key + 1]++
          break
        default:
          console.log(consulta.dia.slice(5, 7))
          break
      }
    }
    )
  })
  console.log(anos)
  dados.unshift([anos[0] + '-' + anos[anos.length - 1], ...anos])
  console.log(dados)
  return (
    <Chart
      sx={{}}
      chartType="Bar"
      width="100%"
      height="400px"
      data={dados}
      options={options}
    />
  );
}