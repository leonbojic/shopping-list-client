import Product from "components/product/Product";
import styles from "styles/ProductTable.module.css";


const ProductTable = ({products}) => {

  return (
    <table className={styles.productTable}>
      <thead>
        <tr>
          <th className={styles.nameCell}>Name</th>
          <th>Category</th>
          <th>Price</th>
          <th>Amount</th>
          <th>Total</th>
        </tr>
      </thead>
      <tbody>
        {products.map((product) => (
          <Product key={product.id} product={product} />
        ))}
      </tbody>
    </table>
  )
}


export default ProductTable;