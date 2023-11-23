import styles from "styles/Auth.module.css";
import buttonStyles from "styles/Button.module.css";


const AuthForm = ({ username, setUsername, password, setPassword, handleSubmit, text }) => {
  return (
    <form className={styles.authForm} onSubmit={handleSubmit}>
      <label>
        Username:
      </label>
      <input type="text" value={username} onChange={(event) => setUsername(event.target.value)} />
      <label>
        Password:
      </label>
      <input type="password" value={password} onChange={(event) => setPassword(event.target.value)} />

      <button type="submit" className={buttonStyles.green}> {text} </button>
    </form>
  )
}


export default AuthForm;