import ProductTable from "components/ProductTable";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import styles from "styles/ShoppingList.module.css";
import { fetchRequest } from "util/api";


const ShoppingList = () => {
  const { listId } = useParams();

  const shoppingList = useSelector((state) => {
    if (listId) {
      return state.shoppingLists[listId];
    } else {
      return null;
    }
  });

  const [products, setProducts] = useState([]);

  useEffect(() => {
    shoppingList?.links?.products?.href && fetchRequest(shoppingList.links.products.href);
  }, [shoppingList])


  return (
    <div className={styles.shoppingList}>
      <h4>{shoppingList?.name}</h4>

      <ProductTable products={products} setProducts={setProducts} createProductUrl={shoppingList?.links?.addProduct?.href} />
    </div>
  )
}


export default ShoppingList;