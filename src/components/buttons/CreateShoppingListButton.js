import styles from "styles/Button.module.css"
import plusIcon from "assets/plusIcon.png";


const CreateShoppingListButton = ({ handleClick }) => {
  return (
    <div className={styles.bigIconSquare} onClick={handleClick}>
      <img src={plusIcon} alt="Settings Button" style={{ width: "100%", height: "100%" }} />
    </div>
  )
}


export default CreateShoppingListButton;