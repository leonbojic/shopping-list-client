import axios from "axios";
import ProductTable from "components/productTable/ProductTable";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import styles from "styles/ShoppingList.module.css";
import { getAuthConfig } from "util/token";


const ShoppingList = () => {
  const { listId } = useParams();

  const shoppingList = useSelector((state) => {
    if (listId) {
      return state.shoppingLists[listId];
    } else {
      return null;
    }
  });

  const [products, setProducts] = useState([1,2,3]);

  useEffect(() => {
    const fetchProducts = async(url) =>{
      try{
        const response = await axios.get(url, getAuthConfig());
        console.log("products",response.data);

      }catch(error){
        console.error(error);
      }
    }

    //shoppingList?.links?.products?.href && fetchProducts(shoppingList.links.products.href);
  }, [shoppingList])

  if (shoppingList) {
    return (
      <div className={styles.shoppingList}>
        <h4>{shoppingList.name}</h4>

        <ProductTable products={products} />

      </div>
    )
  }
}


export default ShoppingList;