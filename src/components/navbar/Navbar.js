import axios from "axios";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import shoppingListsSlice, { setShoppingList } from "redux/shoppingListsSlice";
import styles from "styles/Navbar.module.css";
import { getAuthConfig } from "util/token";
import NavbarShoppingList from "./NavbarShoppingList";

const Navbar = () => {
  const dispatch = useDispatch();
  const lists = useSelector((state) => state.shoppingLists);

  useEffect(() => {
    const fetchShoppingLists = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_SERVER_URL}/api/list`, getAuthConfig());

        const shoppingListsData = response.data._embedded.shoppingListOutputList;

        for (const list of shoppingListsData) {
          dispatch(setShoppingList(list));
        }
      } catch (error) {
        console.error(error);
      }
    }
    fetchShoppingLists();
  }, [])

  console.log("lists", lists);

  return (
    <nav className={styles.navbar}>
      <h4>Shopping lists:</h4>
      {Object.values(lists)?.map((sl, index) => (
        <NavbarShoppingList key={"ShoppingList:" + index} shoppingList={sl}/>
      ))}
    </nav>
  )
}


export default Navbar;