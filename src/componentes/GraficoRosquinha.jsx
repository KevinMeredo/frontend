import React from "react";
import { Chart } from "react-google-charts";

export const data = [
  ["Opção", "quantidade"],
  ["Trabalhando hoje", 12],
  ["Trabalhando essa semana", 2],
  ["de Folga essa Semana", 2],
];

export const options = {
  title: "Medicos em Serviço (quantidade de consultas )",
  pieHole: 0.5
};

export function GraficoRosquinha(props) {
  const dados = props.opcoes.map((opcao)=>{
    return [opcao.nome,props.quantidade.filter((consulta)=>{
      console.log(opcao,consulta)
      return opcao.CRM == consulta.CRM_Medico} ).length]
  })
  dados.unshift( ["Opção", "quantidade"])
  console.log(dados)
  return (
    <Chart
      chartType="PieChart"
      data={dados}
      options={options}
      width={"100%"}
      height={"400px"}
    />
  );
}
