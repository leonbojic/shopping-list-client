import SignOutButton from "components/buttons/SignOutButton";
import Navbar from "components/navbar/Navbar";
import { useAuthContext } from "context/AuthContext";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styles from "styles/Layout.module.css";


const ProtectedLayout = ({ children }) => {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuthContext();

  useEffect(() => {
    isAuthenticated === false && navigate("/")
  }, [isAuthenticated])

  return (
    <div className={styles.layout}>
      <div className={styles.sidebar}>
        <div className={styles.buttons}>
          <SignOutButton />
        </div>
        <Navbar />
      </div>

      <div className={styles.body}>
        {children}
      </div>
    </div>
  )
}


export default ProtectedLayout;