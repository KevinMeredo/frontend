import React from "react";
import { Chart } from "react-google-charts";

export const data = [
  ["2021 - 2023", "2021", "2022", "2023"],
  ["Janeiro", 1000, 400, 200],
  ["Fevereiro", 1170, 460, 250],
  ["Março", 660, 1120, 300],
  ["Abril", 1030, 540, 350],
  ["Maio", 1030, 540, 350],
  ["Junho", 1030, 540, 350],
  ["Julho", 1030, 540, 350],
  ["Agosto", 1030, 540, 350],
  ["Setembro", 1030, 540, 350],
  ["Outubro", 1030, 540, 350],
  ["Novembro", 1030, 540, 350],
  ["Dezembro", 1030, 540, 350],
];

export const options = {
  chart: {
    title: "Pacientes atendidos",
    subtitle: "Sales, Expenses, and Profit: 2014-2017",
  },
};

export function GraficoBarra() {
  return (
    <Chart
    sx={{}}
      chartType="Bar"
      width="100%"
      height="400px"
      data={data}
      options={options}
    />
  );
}