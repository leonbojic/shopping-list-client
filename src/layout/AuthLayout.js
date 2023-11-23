import AuthForm from "forms/AuthForm";
import { useAuthContext } from "context/AuthContext";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "styles/Auth.module.css";
import buttonStyles from "styles/Button.module.css";
import { login, register } from "util/api";


const AuthLayout = () => {
  const navigate = useNavigate();
  const { isAuthenticated, setIsAuthenticated } = useAuthContext();

  const [showLogin, setShowLogin] = useState(true);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    isAuthenticated && navigate("/list");
  }, [isAuthenticated])

  const handleSubmit = (event) => {
    event.preventDefault();

    if (username?.length > 0 && username.length < 20 && password?.length > 0 && password.length < 20) {
      showLogin
        ? login(username, password, setIsAuthenticated)
        : register(username, password, setShowLogin);
    }
  }

  return (
    <div className={styles.layout}>
      <h2>Welcome</h2>

      <div className={styles.window}>
        <AuthForm username={username} setUsername={setUsername} password={password} setPassword={setPassword} handleSubmit={handleSubmit}
          text={showLogin ? "Login" : "Register"}
        />
        <label className={styles.noAcc}>
          {showLogin ? "Don't have and account: " : "Already have an account: "}

          <button
            onClick={(event) => {
              event.preventDefault();
              setPassword("");
              setUsername("");
              setShowLogin(!showLogin);
            }}
            className={buttonStyles.transparent}
          >
            {showLogin ? "register" : "login"}
          </button>
        </label>
      </div>

    </div>
  )
}

export default AuthLayout;