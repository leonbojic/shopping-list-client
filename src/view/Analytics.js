import Charts from "components/Charts";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getRequest } from "util/api";
import { getMonth } from "util/date";
import styles from "styles/Page.module.css";
import tableStyles from "styles/ProductTable.module.css"

const Analytics = () => {
  const { year, month } = useParams();
  const [expenses, setExpenses] = useState(null);
  const [totalExpeneses, setTotalExpenses] = useState(0);


  useEffect(() => {
    let url = `${process.env.REACT_APP_SERVER_URL}/api/stats`;

    if (year) {
      url = url + `/${year}`;
      if (month) {
        url = url + `/${month}`;
      }
    }

    getRequest(url).then((data) => {
      setExpenses(data);
    })
  }, [year, month])

  const [total, setTotal] = useState(0);

  useEffect(() => {
    let val = 0;

    expenses && Object.values(expenses).forEach((exp) => val = val + exp);

    setTotal(val);
  }, [expenses])


  return (
    <div className={styles.page}>
      <div className={styles.header}>
        <h4>Analytics for {month ? getMonth(month) + "/" : null}{year ?? null}  </h4>
      </div>

      <div className={styles.data}>
        <table className={tableStyles.productTable}>
          <thead>
            <tr>
              <th>Category</th>
              <th>Expenses</th>
            </tr>
          </thead>
          <tbody>
            {expenses && Object.keys(expenses).map((exp) => (
              <tr key={exp}>
                <td>{exp}</td>
                <td>{(expenses[exp] / 100).toFixed(2)}$</td>
              </tr>
            ))}
            <tr>
              <td>TOTAL</td>
              <td>{(total / 2).toFixed(2)}$</td>
            </tr>
          </tbody>
        </table>

        <Charts
          expenses={expenses}
        />
      </div>

    </div>
  )
}

export default Analytics;