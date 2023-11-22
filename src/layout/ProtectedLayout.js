import ShoppingList from "components/shoppingList/ShoppingList";
import styles from "styles/Layout.module.css";


const ProtectedLayout =() =>{

  return(
    <div className={styles.layout}>
      <nav className={styles.sidebar}>
        <h4>SIDEBAR</h4>
      </nav>

      <div className={styles.body}>
        <ShoppingList/>
      </div>
    </div>
  )
}


export default ProtectedLayout;