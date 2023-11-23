import ProductTable from "components/ProductTable";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import styles from "styles/Page.module.css";
import { fetchRequest } from "util/api";
import { useExpenses } from "util/hooks";
import Charts from "./Charts";


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
  const { totalExpense, expenses } = useExpenses(products);

  useEffect(() => {
    shoppingList?.links?.products?.href && fetchRequest(shoppingList.links.products.href).then((data) =>
      data?._embedded?.productOutputList && setProducts(data?._embedded?.productOutputList));
  }, [shoppingList, listId])



  return (
    <div className={styles.page}>
      <h4>{shoppingList?.name}</h4>

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
    </div>
  )
}


export default ShoppingList;