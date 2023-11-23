import Chart from "chart.js/auto";
import { CategoryScale } from "chart.js";
import { useEffect, useState } from "react";
import { Pie } from "react-chartjs-2";
import styles from "styles/Chart.module.css";


Chart.register(CategoryScale);

const Charts = ({ expenses }) => {

  const [chartData, setChartData] = useState(null);

  useEffect(() => {
    expenses && setChartData({
      labels: Object.keys(expenses),
      datasets: [
        {
          label: "Money Spent ",
          data: Object.values(expenses),
          backgroundColor: [
            "rgb(255, 99, 71) ",
            "rgb(65, 105, 225) ",
            "rgb(255, 165, 0) ",
            "rgb(218, 112, 214)",
            "rgb(128, 0, 128)",
            "rgb(60, 179, 113) ",
          ],
          borderColor: "black",
          borderWidth: 2,
        }
      ]
    })
  }, [expenses])


  if (chartData) {
    return (
      <div className={styles.charts}>
        <Pie
          data={chartData}
        />
      </div>
    );
  }
}


export default Charts;