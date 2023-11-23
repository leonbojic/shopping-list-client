import styles from "styles/Button.module.css";


const BigIconButton = ({ icon, handleClick }) => {
  return (
    <div className={styles.bigIconSquare} onClick={handleClick}>
      <img src={icon} alt="Big Button" style={{ width: "100%", height: "100%" }} />
    </div>
  )
}


export default BigIconButton;