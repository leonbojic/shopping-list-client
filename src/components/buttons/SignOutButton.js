import { removeToken } from "util/token";
import leaveIcon from "assets/leaveIcon.png";
import styles from "styles/Button.module.css"

const SignOutButton = () => {
  return (
    <div className={styles.bigIconSquare} onClick={
      () => {
        removeToken();
        window.location.reload()
      }
    }>
      <img src={leaveIcon} alt="Settings Button" style={{ width: "100%", height: "100%" }} />
    </div>
  )
}

export default SignOutButton;