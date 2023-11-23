import styles from "styles/ProductTable.module.css";

const NewProduct = ({ product, updateProduct, removeProduct }) => {
  const handleInputChange = (fieldName, value) => {
    updateProduct({ ...product, [fieldName]: value });
  };

  return (
    <tr>
      <td>
        <input
          type="text"
          value={product.name}
          onChange={(event) => handleInputChange('name', event.target.value)}
        />
      </td>
      <td>
        <select
          value={product.category}
          onChange={(event) => handleInputChange('category', event.target.value)}
        >
          <option value="GROCERIES">Groceries</option>
          <option value="HOUSEHOLD_ITEMS">Household_Items</option>
          <option value="ELECTRONICS">Electronics</option>
          <option value="CLOTHES">Clothes</option>
          <option value="FOOTWEAR">Footwear</option>
          <option value="OTHER">Other</option>
        </select>
      </td>

      <td>
        <input
          type="text"
          pattern="[0-9]*"
          inputMode="numeric"
          value={product.price}
          onChange={(event) => handleInputChange('price', event.target.value)}
        />
      </td>
      <td>
        <input
          type="number"
          value={product.amount}
          onChange={(event) => {
            const newValue = parseInt(event.target.value);
            if (!isNaN(newValue) && newValue > 0) {
              handleInputChange('amount', newValue);
            }
          }}
        />
      </td>
      <td>{(product.amount * product.price / 100).toFixed(2)} $</td>

      <td>
        <button onClick={removeProduct}>Remove</button>
      </td>
    </tr>
  );
};

export default NewProduct;