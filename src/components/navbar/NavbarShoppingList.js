import { useNavigate } from "react-router-dom";
import styles from "styles/Navbar.module.css";



const NavbarShoppingList = ({ shoppingList }) => {
  const navigate = useNavigate();


  return (
    <li className={styles.shoppingList}
      onClick={() => navigate(`/list/${shoppingList.id}`)}>
      {shoppingList.name}
    </li>
  )
}

export default NavbarShoppingList;