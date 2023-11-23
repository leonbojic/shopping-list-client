import axios from "axios";
import { getAuthConfig, storeToken } from "./token";


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

export const getRequest = async (url) => {
  try {
    const response = await axios.get(url, getAuthConfig());
    return response.data;
  } catch (error) {
    console.error(error);
  }
}

export const postRequest = async (url, body) => {
  try {
    const response = await axios.post(url, body, getAuthConfig());
    return response.data;
  } catch (error) {
    console.error(error);
  }
}

export const putRequest = async (url, body) => {
  try {
    const response = await axios.put(url, body, getAuthConfig());
    return response.data;
  } catch (error) {
    console.error(error);
  }
}

export const deleteRequest = async (url) => {
  try {
    await axios.delete(url, getAuthConfig());
  } catch (error) {
    console.error(error);
  }
}