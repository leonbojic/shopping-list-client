import Charts from "components/Charts";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchRequest } from "util/api";
import { getMonth } from "util/date";
import styles from "styles/Page.module.css";


const Analytics = () => {
  const { year, month } = useParams();
  const [expenses, setExpenses] = useState(null);

  useEffect(() => {
    let url = `${process.env.REACT_APP_SERVER_URL}/api/stats`;

    if (year) {
      url = url + `/${year}`;
      if (month) {
        url = url + `/${month}`;
      }
    }
    console.log(url)

    fetchRequest(url).then((data) => {
      setExpenses(data);
    })

    console.log(expenses);
  }, [year, month])


  return (
    <div className={styles.page}>
      <h4>Analytics for {month ? getMonth(month) + "/" : null}{year ?? null}  </h4>


      <Charts
        expenses={expenses}
      />
    </div>
  )
}

export default Analytics;