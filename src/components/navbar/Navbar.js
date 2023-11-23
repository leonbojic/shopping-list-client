import axios from "axios";
import CreateShoppingListButton from "components/buttons/CreateShoppingListButton";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setCreateList } from "redux/linksSlice";
import { setShoppingList } from "redux/shoppingListsSlice";
import styles from "styles/Navbar.module.css";
import { getAuthConfig } from "util/token";


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

      <CreateShoppingListButton 
        handleClick={(event) => {
          event.preventDefault();
          navigate("/list")
        }}
      />

      {Object.values(lists)?.map((shoppingList) => (
        <li key={shoppingList.id}
          className={styles.shoppingList}
          onClick={() => navigate(`/list/${shoppingList.id}`)}>
          {shoppingList.name}
        </li>
      ))}
    </nav>
  )
}


export default Navbar;