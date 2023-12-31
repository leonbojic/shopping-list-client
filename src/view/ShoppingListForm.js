import Charts from "components/Charts";
import ProductTable from "components/ProductTable";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setShoppingList } from "redux/shoppingListsSlice";
import styles from "styles/Page.module.css";
import { postRequest, getRequest } from "util/api";
import { useExpenses } from "util/hooks";


const ShoppingListForm = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const createUrl = useSelector((state) => state.links.createList);

  const [name, setName] = useState("");
  const [products, setProducts] = useState([]);
  const { totalExpense, expenses } = useExpenses(products);

  const handleSubmit = async (event) => {
    event.preventDefault();
    postRequest(
      createUrl,
      { name: name, products }
    ).then((newListUrl) =>
      getRequest(newListUrl)).then((newList) => {
        dispatch(setShoppingList(newList));
        setProducts([]);
        navigate(`/list/${newList.id}`)
      });
  };

  return (
    <div className={styles.page}>
      <form >
        <h4><input type="text" value={name} onChange={(event) => setName(event.target.value)} /></h4>

        <ProductTable products={products} setProducts={setProducts} />

        <button onClick={handleSubmit}>Create</button>
      </form>

      <div className={styles.totalExpense}>
        Total Cost: {(totalExpense / 100).toFixed(2)}$
      </div>

      {
        totalExpense > 0 &&
        < Charts
          expenses={expenses}
        />
      }
    </div>
  )
}

export default ShoppingListForm;