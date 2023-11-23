import EditProductRow from "components/EditProductRow";
import Product from "components/Product";
import styles from "styles/ProductTable.module.css";
import { createRequest, deleteRequest, fetchRequest, updateRequest } from "util/api";


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
      createRequest(createProductUrl, product).then((createdProductUrl) =>
        fetchRequest(createdProductUrl).then((createdProduct) => addProduct(createdProduct)))
    } else {
      addProduct(product);
    }
  }

  const handleUpdateProduct = (index, product, url) => {
    const updateProductByIndex = (updatedProduct) => {
      setProducts((prev) => {
        const updatedProducts = [...prev];
        updatedProducts[index] = product;

        return updatedProducts;
      })
    }

    if (url) {
      updateRequest(url, product).then((updatedProduct) =>
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
        </tr>
      </thead>
      <tbody>
        {products.map((product, index) => (
          <Product
            key={index}
            product={product}
            handleRemove={() => handleRemoveProduct(index, product?._links?.delete?.href)}
            handleUpdate={(updatedProduct) => handleUpdateProduct(index, updatedProduct, product?._links?.update?.href)}
          />
        ))}
        <EditProductRow setProduct={handleAddProduct} />

      </tbody>
    </table>
  )
}


export default ProductTable;