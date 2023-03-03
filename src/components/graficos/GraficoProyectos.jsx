import React from "react";
import { Radar } from "react-chartjs-2";
import { useAxios } from "../../hooks/useAxios";
import Spinner from "../Spinner";
import {
  Chart as ChartJS,
  PolarAreaController,
  RadialLinearScale,
  PointElement,
  LineElement,
  ArcElement,
} from "chart.js";

ChartJS.register(
  PolarAreaController,
  RadialLinearScale,
  PointElement,
  LineElement,
  ArcElement
);
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

const GraficoProyectos = () => {
  const { data, error, loading, execute } = useAxios({
    url: "/api/projectToDo",
    method: "GET",
  });
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
  const projects = [...new Set(data.map((project) => project.name))];
  console.log(data.map((coaster) => coaster.percentageOfCompletion));
  const dataOk = {
    labels: projects,
    datasets: [
      {
        label: "Avance %",
        data: data.map((coaster) => coaster.percentageOfCompletion),
        borderColor: getDataColors()[4],
        backgroundColor: getDataColors(40)[4],
      },
      {
        label: "Facturado",
        data: data.map((coaster) => coaster.numberOfModules),
        borderColor: getDataColors()[5],
        backgroundColor: getDataColors(20)[5],
      },
    ],
    
  };
  const options = {
    borderWidth: 2,
    min: 0,
    maintainAspectRatio: false,
    scales: {
      r: {
        ticks: { beginAtZero: true, display: false, min: 0 },
      },
    },
  };
  return <Radar data={dataOk} options={options} />;
};

export default GraficoProyectos;
