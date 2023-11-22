import axios from "axios";
import { storeToken } from "./token";


export const login = async (username, password, setIsAuthenticated) => {
  try {
    const response = await axios.post(`${process.env.REACT_APP_SERVER_URL}/api/auth/login`, { username, password });
    console.log("Logged in");
    storeToken(response.data);
    setIsAuthenticated(true);
  } catch (error) {
    console.error(error);
  }
}

export const register = async (username, password, setShowLogin) => {
  try {
    const response = await axios.post(`${process.env.REACT_APP_SERVER_URL}/api/auth/register`, { username, password });
    console.log(response.data)
    setShowLogin(true);
  } catch (error) {
    console.error(error);
  }
}