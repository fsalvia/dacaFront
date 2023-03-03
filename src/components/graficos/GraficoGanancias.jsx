import { useMemo, useEffect, useState, componentDidMount } from "react";
import axios from "axios";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler,
} from "chart.js";
import { BACKEND } from "../../constants/backend";

import { Line } from "react-chartjs-2";
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

const GraficoGanancias = () => {
  const [facturas, setFacturas] = useState([]);

  useEffect(() => {
    const obtainDashboardApi = async () => {
      try {
        const url = `${BACKEND}/api/dashboard/last6MonthBilling`;
        const response = await fetch(url);
        const resultado = await response.json();
        setFacturas(resultado);
      } catch (error) {
        console.log(error);
      }
    };
    obtainDashboardApi();
  }, []);

  const scores2 = [200000, 200000, 200000, 200000, 200000, 4, 5, 3, 2];

  const options = {
    maintainAspectRatio: false,
    fill: true,
    responsive: true,
    scales: {
      y: {
        min: 0,
      },
    },
    animation: {
      duration: 0,
    },
    plugins: {
      legend: {
        display: true,
      },
    },
  };
  let meses2 = [];

  for (let index = 0; index < 6; index++) {
    var x = new Date();
    x.setDate(1);
    x.setMonth(x.getMonth() - index);
    meses2.push(((x.getMonth())+1).toString()+'/'+x.getFullYear())
  }

  meses2.reverse()

  const data = useMemo(function () {
    let facturado = [];
    let meses = [];
    axios
      .get(`${BACKEND}/api/dashboard/last6MonthBilling`)
      .then((res) => {
        facturado.push(res.data[5].total_income);
        facturado.push(res.data[4].total_income);
        facturado.push(res.data[3].total_income);
        facturado.push(res.data[2].total_income);
        facturado.push(res.data[1].total_income);
        facturado.push(res.data[0].total_income);
      })
      .catch((err) => {
        console.log(err);
      });

    let gastado = [];

    axios
      .get(`${BACKEND}/api/dashboard/last6MonthExpenses`)
      .then((res) => {
        gastado.push(res.data[5].total_income);
        gastado.push(res.data[4].total_income);
        gastado.push(res.data[3].total_income);
        gastado.push(res.data[2].total_income);
        gastado.push(res.data[1].total_income);
        gastado.push(res.data[0].total_income);
      })
      .catch((err) => {
        console.log(err);
      });

    return {
      labels: meses2,
      datasets: [
        {
          label: "Ingresos",
          data: facturado,
          tension: 0.3,
          borderColor: "rgba(102, 126, 234, 1)",
          pointRadius: 6,
          pointBackgroundColor: "rgba(102, 126, 234, 1)",
          backgroundColor: "rgba(102, 126, 234, 0.25)",
        },
        {
          label: "Egresos",
          tension: 0.3,
          data: gastado,
          backgroundColor: "rgba(237, 100, 166, 0.25)",
          borderColor: "rgba(237, 100, 166, 1)",
          pointBackgroundColor: "rgba(237, 100, 166, 1)",
          pointRadius: 6,
        },
      ],
    };
  }, []);

  return <Line data={data} options={options} />;
};

export default GraficoGanancias;
