import styles from "styles/ProductTable.module.css"

const Product = ({ product }) => {


  return (
    <tr>
      <td className={styles.nameCell}>{product.name}</td>
      <td>{product.category}</td>
      <td>{(product.price / 100).toFixed(2)} $</td>
      <td>{product.amount}</td>
      <td>{(product.amount * product.price / 100).toFixed(2)} $</td>
    </tr>
  )
}

export default Product;