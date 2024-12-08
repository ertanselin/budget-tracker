import { Pie } from "react-chartjs-2";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  Title,
  CategoryScale,
  LinearScale,
} from "chart.js";

ChartJS.register(
  ArcElement,
  Tooltip,
  Legend,
  Title,
  CategoryScale,
  LinearScale
);

export default function PieChart({ data, title }) {
  const chartData = {
    labels: data.labels,
    datasets: [
      {
        data: data.values,
        backgroundColor: data.colors,
        hoverOffset: 4,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      title: {
        display: true,
        text: title,
        font: {
          size: 24,
          family: "'Arial', sans-serif",
          weight: "bold",
        },
        color: "#6c9ec2c1",
      },
      tooltip: {
        backgroundColor: "rgba(0, 0, 0, 0.7)",
        titleColor: "#fff",
        bodyColor: "#fff",
      },
      legend: {
        labels: {
          font: {
            size: 18,
            weight: "bold",

            family: "'Arial', sans-serif",
          },
          color: "#eff2f2",
        },
      },
    },
    elements: {
      arc: {
        borderWidth: 2,
      },
    },
  };

  return (
    <div className="mb-4 w-[350px] lg:w-[500px] h-[350px] lg:h-[400px]">
      <Pie data={chartData} options={options} />
    </div>
  );
}
