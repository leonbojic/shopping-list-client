import EditProductRow from "components/EditProductRow";
import ProductRow from "components/ProductRow";
import styles from "styles/ProductTable.module.css";
import { deleteRequest, getRequest, postRequest, putRequest } from "util/api";


const ProductTable = ({ products, setProducts, createProductUrl }) => {

  const handleRemoveProduct = async (index, url) => {
    const removeProduct = () => {
      setProducts((prevProducts) => {
        const updatedProducts = [...prevProducts.slice(0, index), ...prevProducts.slice(index + 1)];
        return updatedProducts;
      });
    };

    if (url) {
      deleteRequest(url).then(removeProduct);
    } else {
      removeProduct()
    }
  }

  const handleAddProduct = (product) => {
    const addProduct = (newProduct) => {
      setProducts([...products, newProduct]);
    }

    if (createProductUrl) {
      postRequest(createProductUrl, product).then((createdProductUrl) =>
        getRequest(createdProductUrl).then((createdProduct) => addProduct(createdProduct)))
    } else {
      addProduct(product);
    }
  }

  const handleUpdateProduct = (index, product, url) => {
    const updateProductByIndex = (newProduct) => {
      setProducts((prev) => {
        const updatedProducts = [...prev];
        updatedProducts[index] = newProduct;

        return updatedProducts;
      })
    }

    if (url) {
      putRequest(url, product).then((updatedProduct) =>
        updateProductByIndex(updatedProduct));
    }
  }

  return (
    <table className={styles.productTable}>
      <thead>
        <tr>
          <th className={styles.nameCell}>Name</th>
          <th>Category</th>
          <th>Price</th>
          <th>Amount</th>
          <th>Total</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        {products.map((product, index) => (
          <ProductRow
            key={index}
            product={product}
            handleRemove={() => handleRemoveProduct(index, product?._links?.delete?.href)}
            handleUpdate={(updatedProduct) => handleUpdateProduct(index, updatedProduct, product?._links?.update?.href)}
          />
        ))}
        <tr>
          <td colSpan="6" className={styles.centeredCell}>
            <div className={styles.addNewProduct}>Add a new product:</div>
          </td>
        </tr>
        <EditProductRow setProduct={handleAddProduct} />

      </tbody>
    </table>
  )
}


export default ProductTable;