import styles from "styles/ProductTable.module.css"

const Product = ({ url }) => {

  //useEffect
  //fetchProduct

  const product = {
    "name": "chocolate",
    "price": 150,
    "amount": 2,
    "category": "GROCERIES",
  }

  return (
    <tr>
      <td className={styles.nameCell}>{product.name}</td>
      <td>{product.amount}</td>
      <td>{(product.price / 100).toFixed(2)} $</td>
      <td>{(product.amount * product.price / 100).toFixed(2)} $</td>
    </tr>
  )
}

export default Product;