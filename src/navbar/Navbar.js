import plusIcon from "assets/plusIcon.png";
import BigIconButton from "buttons/BigIconButton";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setCreateList } from "redux/linksSlice";
import { setShoppingList } from "redux/shoppingListsSlice";
import styles from "styles/Navbar.module.css";
import { getRequest } from "util/api";
import { useSorted } from "util/hooks";
import React from "react";
import pieIcon from "assets/pieIcon.png";
import { getMonth } from "util/date";


const Navbar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const lists = useSelector((state) => state.shoppingLists);
  const sortedLists = useSorted(lists);

  useEffect(() => {
    getRequest(`${process.env.REACT_APP_SERVER_URL}/api/list`).then((data) => {

      dispatch(setCreateList(data?._links?.create?.href));
      data?._embedded?.shoppingListOutputList?.forEach((list) => dispatch(setShoppingList(list)))
    })
  }, [])

  let lastDate;

  return (
    <nav className={styles.navbar}>

      <BigIconButton
        icon={plusIcon}
        handleClick={(event) => {
          event.preventDefault();
          navigate("/list")
        }}
      />

      {sortedLists?.map((shoppingList, index) => {
        let renderStats = true;
        const date = new Date(shoppingList.timeBought);

        if (lastDate &&
          date.getFullYear() === lastDate.getFullYear() &&
          date.getMonth() === lastDate.getMonth()
        ) {
          renderStats = false;
        }
        lastDate = date;

        return (
          <React.Fragment key={index}>
            {renderStats &&
              <div className={styles.stats} >
                {getMonth(date.getMonth() + 1)}/{date.getFullYear()}
                < BigIconButton
                  handleClick={() => navigate(`/stats/${date.getFullYear()}/${date.getMonth() + 1}`)}
                  icon={pieIcon}
                />
              </div>
            }
            <li
              className={styles.shoppingList}
              onClick={() => navigate(`/list/${shoppingList.id}`)}>
              {shoppingList.name}
            </li>
          </React.Fragment>
        )
      })}
    </nav>
  )
}


export default Navbar;