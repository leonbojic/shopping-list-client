import styles from "styles/Button.module.css";


const SmallIconButton = ({icon,handleClick}) => {
  return (
    <div className={styles.smallIcon} onClick={handleClick}>
      <img src={icon} alt="Small Button" style={{ width: "100%", height: "100%" }} />
    </div>
  )
}


export default SmallIconButton;