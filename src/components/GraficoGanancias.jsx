import { useMemo, useEffect, useState,componentDidMount } from "react";
import axios from "axios"
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
        const url = "http://168.181.184.148:8080/api/dashboard/last6MonthBilling";
        const response = await fetch(url);
        const resultado = await response.json();
        setFacturas(resultado);
      } catch (error) {
        console.log(error);
      }
    }
    obtainDashboardApi()
    
  },[])


  const scores2 = [1, 3, 2, 2, 4, 4, 5, 3, 2];


  const options = {
    fill: true,
    responsive: true,
    scales: {
      y: {
        min: 0,
      },
    },
    plugins: {
      legend: {
        display: true,
      },
    },
  };

  const data = useMemo(function () {
    let facturado = [];
    let meses = [];
    axios.get("http://168.181.184.148:8080/api/dashboard/last6MonthBilling")
    .then(res => {
      facturado.push(res.data[5].total_income);
      facturado.push(res.data[4].total_income);
      facturado.push(res.data[3].total_income);
      facturado.push(res.data[2].total_income);
      facturado.push(res.data[1].total_income);
      facturado.push(res.data[0].total_income);
      meses.push(res.data[5].month);
      meses.push(res.data[4].month);
      meses.push(res.data[3].month);
      meses.push(res.data[2].month);
      meses.push(res.data[1].month);
      meses.push(res.data[0].month);
    })
    .catch(err => {
      console.log(err)
    });
    console.log(meses);
    
    return {
      labels:meses,
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
          label: "Mis datos (2)",
          tension: 0.3,
          data: scores2,
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
