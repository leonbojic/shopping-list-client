import ProductTable from "components/ProductTable";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import styles from "styles/Page.module.css";
import { deleteRequest, getRequest, putRequest } from "util/api";
import { useExpenses } from "util/hooks";
import Charts from "./Charts";
import SmallIconButton from "buttons/SmallIconButton";
import editIcon from "assets/editIcon.png";
import cancelEditIcon from "assets/cancelEditIcon.png";
import { removeShoppingList, setShoppingList } from "redux/shoppingListsSlice";
import checkIcon from "assets/checkIcon.png";
import deleteIcon from "assets/cancelIcon.png";


const ShoppingList = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { listId } = useParams();
  const shoppingList = useSelector((state) => {
    if (listId) {
      return state.shoppingLists[listId];
    } else {
      return null;
    }
  });

  const [products, setProducts] = useState([]);
  const { totalExpense, expenses } = useExpenses(products);

  useEffect(() => {
    const url = shoppingList?.links?.products?.href
    url && getRequest(url).then((data) =>
      data?._embedded?.productOutputList && setProducts(data?._embedded?.productOutputList));
  }, [shoppingList, listId])

  const [showEditName, setShowEditName] = useState(false);
  const [newName, setNewName] = useState(shoppingList?.name ?? "");
  const [newDate, setNewDate] = useState(shoppingList?.timeBought);


  const handleUpdateList = () => {
    const url = shoppingList?.links?.update?.href;
    if (newName.length <= 20 && url) {
      putRequest(url, { name: newName, date: newDate }).then((data) => dispatch(setShoppingList(data)));
    }
  }

  const handleDeleteList = () => {
    const url = shoppingList?.links?.delete.href;
    const id = listId;
    url && deleteRequest(url).then(() => {
      dispatch(removeShoppingList(id));
      navigate("/list");
    });
  }

  return (
    <div className={styles.page}>
      {showEditName
        ?
        <div className={styles.header}>
          <input type="text" value={newName} placeholder="Enter shopping list name" onChange={(event) => setNewName(event.target.value)} />
          <input type="date" value={newDate} onChange={(event) => setNewDate(event.target.value)} />
          <div className={styles.buttons}>
            <SmallIconButton icon={checkIcon} handleClick={handleUpdateList} />
            <SmallIconButton icon={deleteIcon} handleClick={handleDeleteList} />
            <SmallIconButton icon={cancelEditIcon} handleClick={() => setShowEditName(false)} />
          </div>

        </div>
        :
        <div className={styles.header}>
          <h4>{shoppingList?.name} - {shoppingList?.timeBought}</h4>
          <div className={styles.buttons}>
            <SmallIconButton icon={editIcon} handleClick={() => setShowEditName(true)} />
          </div>
        </div>
      }


      <ProductTable products={products} setProducts={setProducts} createProductUrl={shoppingList?.links?.addProduct?.href} />

      <div className={styles.totalExpense}>
        Total Cost: {totalExpense}
      </div>

      {
        totalExpense > 0 &&
        < Charts
          expenses={expenses}
        />
      }
    </div >
  )
}


export default ShoppingList;