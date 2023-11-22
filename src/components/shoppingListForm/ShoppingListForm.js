import axios from "axios";
import NewProduct from "components/newProduct/NewProduct";
import { useState } from "react";
import { useSelector } from "react-redux";
import tableStyles from "styles/ProductTable.module.css";
import listStyles from "styles/ShoppingList.module.css";
import { getAuthConfig } from "util/token";


const ShoppingListForm = () => {
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
    if (createUrl) {
      try {
        const productsWithoutIds = products.map(({ id, ...rest }) => rest);

        const response = await axios.post(
          createUrl,
          { name: name, products: productsWithoutIds },
          getAuthConfig()
        );

        console.log("Response:", response.data);
      } catch (error) {
        console.error(error);
      }
    }
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