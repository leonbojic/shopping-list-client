import axios from "axios";
import NewProduct from "components/newProduct/NewProduct";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setShoppingList } from "redux/shoppingListsSlice";
import tableStyles from "styles/ProductTable.module.css";
import listStyles from "styles/ShoppingList.module.css";
import { createShoppingList, fetchShoppingList } from "util/shoppingList";


const ShoppingListForm = () => {
  const dispatch = useDispatch();
  const createUrl = useSelector((state) => state.links.createList);

  const [name, setName] = useState("");
  const [products, setProducts] = useState([{ id: 1, name: "", price: 0, category: "OTHER", amount: 1 }]);

  const handleAddProduct = (event) => {
    event.preventDefault();

    const newProductId = products.length + 1;
    setProducts([...products, { id: newProductId, name: "", price: 0, category: "OTHER", amount: 1 }])
  }

  const handleUpdateProduct = (productId, updatedData) => {
    const updatedProducts = products.map(product =>
      product.id === productId ? { ...product, ...updatedData } : product
    );
    setProducts(updatedProducts);
  }

  const handleRemoveProduct = (productId) => {
    const updatedProducts = products.filter(product => product.id !== productId);
    setProducts(updatedProducts);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    createShoppingList(
      createUrl,
      { name: name, products: products.map(({ id, ...rest }) => rest) }
    ).then((newListUrl) =>
      fetchShoppingList(newListUrl)).then((newList) => dispatch(setShoppingList(newList)));
  };

  return (
    <form className={listStyles.shoppingList}>
      <h4><input type="text" value={name} onChange={(event) => setName(event.target.value)} /></h4>

      <table className={tableStyles.productTable}>
        <thead>
          <tr>
            <th className={tableStyles.nameCell}>Name</th>
            <th>Category</th>
            <th>Price</th>
            <th>Amount</th>
            <th>Total</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product) => (
            <NewProduct
              key={product.id}
              product={product}
              updateProduct={(updatedData) => handleUpdateProduct(product.id, updatedData)}
              removeProduct={() => handleRemoveProduct(product.id)}
            />
          ))}
        </tbody>
      </table>
      <button onClick={handleAddProduct}>Add Product</button>
      <button onClick={handleSubmit}>Create</button>
    </form>
  )

}

export default ShoppingListForm;