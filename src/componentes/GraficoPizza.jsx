import React from "react";
import { Chart } from "react-google-charts";

export const data = [
  ["Task", "Hours per Day"],
  ["Trabalhando hoje", 11],
  ["Trabalhando essa semana", 2],
  ["de Folga essa Semana", 2],
];

export const options = {
  title: "Medicos em Serviço",
};

export function GraficoPizza() {
  return (
    <Chart
      
      chartType="PieChart"
      data={data}
      options={options}
      width={"100%"}
      height={"400px"}
    />
  );
}
