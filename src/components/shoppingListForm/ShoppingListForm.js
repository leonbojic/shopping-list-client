import ProductTable from "components/productTable/ProductTable";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setShoppingList } from "redux/shoppingListsSlice";
import listStyles from "styles/ShoppingList.module.css";
import { createShoppingList, fetchShoppingList } from "util/shoppingList";


const ShoppingListForm = () => {
  const dispatch = useDispatch();
  const createUrl = useSelector((state) => state.links.createList);

  const [name, setName] = useState("");
  const [products, setProducts] = useState([]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    createShoppingList(
      createUrl,
      { name: name, products} 
    ).then((newListUrl) =>
      fetchShoppingList(newListUrl)).then((newList) => dispatch(setShoppingList(newList)));
  };

  return (
    <form className={listStyles.shoppingList}>
      <h4><input type="text" value={name} onChange={(event) => setName(event.target.value)} /></h4>

      <ProductTable products={products} setProducts={setProducts}/>

      <button onClick={handleSubmit}>Create</button>
    </form>
  )

}

export default ShoppingListForm;