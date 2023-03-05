import React, { useEffect } from "react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend, Title } from "chart.js";
import { BACKEND } from "../../constants/backend";
import { Doughnut } from "react-chartjs-2";
import { useAxios } from "../../hooks/useAxios";
import Spinner from "../Spinner";

ChartJS.register(ArcElement, Tooltip, Legend, Title);

const getDataColors = (opacity) => {
  const colors = [
    "#7448c2",
    "#21c0d7",
    "#d99e2b",
    "#cd3a81",
    "#9c99cc",
    "#e14eca",
    "#ffffff",
    "#ff0000",
    "#d6ff00",
    "#0038ff",
  ];
  return colors.map((color) => (opacity ? `${color + opacity}` : color));
};

const GraficoGastos = ({ mes, year }) => {
  if (!mes) {
    mes = new Date().getMonth()+1;
  }
  if (!year) {
    year = new Date().getFullYear();
  }
  const { data, error, loading, execute } = useAxios({
    url: "/api/incomingbillexpenses",
    method: "GET",
    params: { month: mes, year: year },
  });
  useEffect(() => {
    execute({
      method: "GET",
      params: {
        month: mes,
        year: year,
      },
    });
  }, [mes, year]);

  if (loading) return <Spinner></Spinner>;
  
  if (data === undefined)
    return (
      <p className="text-gray-300 text-lg text-center pt-10">
        No hay datos para mostrar
      </p>
    );
  if (Object.keys(data).length === 0)
    return (
      <p className="text-gray-300 text-lg text-center pt-10">
        No hay datos para mostrar
      </p>
    );

  const concept = [...new Set(data.map((concept) => concept.concept))];

  const dataOk = {
    labels: concept,
    datasets: [
      {
        data: data.map((concept) => concept.amount),
        borderColor: getDataColors(),
        backgroundColor: getDataColors(40),
      },
    ],
  };

  const options = {
    maintainAspectRatio:false,
    plugins: {
      legend: { position: "left" },
    },
  };

  return <Doughnut data={dataOk} options={options}></Doughnut>;
};

export default GraficoGastos;
