import editIcon from "assets/editIcon.png";
import SmallIconButton from "buttons/SmallIconButton";
import EditProductRow from "components/EditProductRow";
import { useState } from "react";
import styles from "styles/ProductTable.module.css";


const ProductRow = ({ product, handleUpdate, handleRemove }) => {
  const [showEdit, setShowEdit] = useState(false);

  if (showEdit) {
    return (
      <EditProductRow
        setProduct={handleUpdate}
        removeProduct={handleRemove}
        product={product}
        cancelEdit={() => setShowEdit(false)}
      />
    )
  } else {
    return (
      <tr>
        <td>{product.name}</td>
        <td>{product.category}</td>
        <td>{(product.price / 100).toFixed(2)} $</td>
        <td>{product.amount}</td>
        <td>{(product.amount * product.price / 100).toFixed(2)} $</td>
        <td className={styles.buttons}><SmallIconButton icon={editIcon} handleClick={() => setShowEdit(true)} /></td>
      </tr>
    )
  }
}


export default ProductRow;