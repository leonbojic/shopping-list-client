import plusIcon from "assets/plusIcon.png";
import BigIconButton from "buttons/BigIconButton";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setCreateList } from "redux/linksSlice";
import { setShoppingList } from "redux/shoppingListsSlice";
import styles from "styles/Navbar.module.css";
import { fetchRequest } from "util/api";


const Navbar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const lists = useSelector((state) => state.shoppingLists);

  useEffect(() => {
    fetchRequest(`${process.env.REACT_APP_SERVER_URL}/api/list`).then((data) => {

      dispatch(setCreateList(data?._links?.create?.href));
      data?._embedded?.shoppingListOutputList?.forEach((list) => dispatch(setShoppingList(list)))
    })
  }, [])


  return (
    <nav className={styles.navbar}>
      <h4>Shopping lists:</h4>

      {Object.values(lists)?.map((shoppingList) => (
        <li key={shoppingList.id}
          className={styles.shoppingList}
          onClick={() => navigate(`/list/${shoppingList.id}`)}>
          {shoppingList.name}
        </li>
      ))}


      <BigIconButton
        icon={plusIcon}
        handleClick={(event) => {
          event.preventDefault();
          navigate("/list")
        }}
      />
    </nav>
  )
}


export default Navbar;