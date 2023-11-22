import ProductTable from "components/productTable/ProductTable";
import styles from "styles/ShoppingList.module.css";


const ShoppingList = () =>{

  return(
    <div className={styles.shoppingList}>
      <h4>SHOPPING LIST</h4>
  
      <ProductTable/>
    </div>
  )
}


export default ShoppingList;