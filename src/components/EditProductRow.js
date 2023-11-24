import cancelIcon from "assets/cancelEditIcon.png";
import removeIcon from "assets/cancelIcon.png";
import checkIcon from "assets/checkIcon.png";
import SmallIconButton from "buttons/SmallIconButton";
import { useState } from "react";
import styles from "styles/ProductTable.module.css";


const EditProductRow = ({ setProduct, removeProduct, product, cancelEdit }) => {
  const [name, setName] = useState(product?.name ?? "");
  const [category, setCategory] = useState(product?.category ?? "OTHER");
  const [amount, setAmount] = useState(product?.amount ?? 1);
  const [price, setPrice] = useState(product?.price ?? 100);


  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      event.preventDefault();
      setProduct({ name: name, price: price, amount: amount, category: category });
      cancelEdit && cancelEdit();
      setName("");
      setPrice(100);
      setAmount(1);
    }
  };

  return (
    <tr onKeyDown={handleKeyDown}>
      <td>
        <input
          placeholder="enter product name"
          type="text"
          value={name}
          onChange={(event) => setName(event.target.value)}
        />
      </td>
      <td width={{ minWidth: "160px" }}>
        <select
          value={category}
          onChange={(event) => setCategory(event.target.value)}
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
          value={price}
          onChange={(event) => setPrice(event.target.value)}
        />
      </td>
      <td>
        <input
          type="number"
          value={amount}
          onChange={(event) => {
            const newValue = parseInt(event.target.value);
            if (!isNaN(newValue) && newValue > 0) {
              setAmount(newValue);
            }
          }}
        />
      </td>
      <td>{(amount * price / 100).toFixed(2)} $</td>

      <td className={styles.buttons}>
        <SmallIconButton
          handleClick={() => {
            setProduct({ name: name, price: price, amount: amount, category: category });
            cancelEdit && cancelEdit();
            setName("");
            setPrice(100);
            setAmount(1);
          }}
          icon={checkIcon}
        />
        {removeProduct && <SmallIconButton handleClick={removeProduct} icon={removeIcon} />}
        {cancelEdit && <SmallIconButton handleClick={cancelEdit} icon={cancelIcon} />}
      </td>
    </tr>
  )
}


export default EditProductRow;