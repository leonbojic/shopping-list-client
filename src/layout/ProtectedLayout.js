import Navbar from "components/navbar/Navbar";
import ShoppingList from "components/shoppingList/ShoppingList";
import { useAuthContext } from "context/AuthContext";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styles from "styles/Layout.module.css";


const ProtectedLayout =() =>{
  const navigate = useNavigate();
  const { isAuthenticated } = useAuthContext();

  useEffect(()=>{
    isAuthenticated === false && navigate("/")
  },[isAuthenticated])

  return(
    <div className={styles.layout}>
      <div className={styles.sidebar}>
        <Navbar/>
      </div>

      <div className={styles.body}>
        <ShoppingList/>
      </div>
    </div>
  )
}


export default ProtectedLayout;