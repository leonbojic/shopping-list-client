import axios from "axios";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import styles from "styles/Navbar.module.css";
import { getAuthConfig } from "util/token";
import NavbarShoppingList from "./NavbarShoppingList";
import { setShoppingList } from "redux/shoppingListsSlice";
import { setCreateList } from "redux/linksSlice";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const lists = useSelector((state) => state.shoppingLists);

  useEffect(() => {
    const fetchShoppingLists = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_SERVER_URL}/api/list`, getAuthConfig());

        dispatch(setCreateList(response.data?._links?.create?.href));

        response.data?._embedded?.shoppingListOutputList?.forEach((list) => dispatch(setShoppingList(list)))

      } catch (error) {
        console.error(error);
      }
    }
    fetchShoppingLists();
  }, [])


  return (
    <nav className={styles.navbar}>
      <h4>Shopping lists:</h4>
      <button onClick={(event) => {
        event.preventDefault();
        navigate("/list")
      }}>
        Create
      </button>


      {Object.values(lists)?.map((sl, index) => (
        <NavbarShoppingList key={"ShoppingList:" + index} shoppingList={sl} />
      ))}
    </nav>
  )
}


export default Navbar;