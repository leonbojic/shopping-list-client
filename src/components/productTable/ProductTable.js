import Product from "components/product/Product";
import styles from "styles/ProductTable.module.css";


const ProductTable = () => {

  const products = [1, 2, 3, 4, 5];

  return (
    <table className={styles.productTable}>
      <thead>
        <tr>
          <th className={styles.nameCell}>Name</th>
          <th>Price</th>
          <th>Amount</th>
          <th>Total</th>
        </tr>
      </thead>
      <tbody>
        {products.map((index) => (
          <Product key={index} />
        ))}
      </tbody>
    </table>
  )

}


export default ProductTable;