import Navbar from "navbar/Navbar";
import { useAuthContext } from "context/AuthContext";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styles from "styles/Layout.module.css";
import BigIconButton from "buttons/BigIconButton";
import { removeToken } from "util/token";
import leaveIcon from "assets/leaveIcon.png";
import { Outlet } from "react-router-dom";

const ProtectedLayout = ({ children }) => {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuthContext();

  useEffect(() => {
    isAuthenticated === false && navigate("/auth")
  }, [isAuthenticated, navigate])

  return (
    <div className={styles.layout}>
      <div className={styles.sidebar}>
        <div className={styles.buttons}>
          <BigIconButton
            icon={leaveIcon}
            handleClick={() => {
              removeToken();
              window.location.reload()
            }} />
        </div>
        <Navbar />
      </div>

      <div className={styles.body}>
        <Outlet/>
      </div>
    </div>
  )
}


export default ProtectedLayout;