import axios from "axios";
import { getAuthConfig } from "util/token";

export const fetchProduct = async (url) => {
  try {
    const response = await axios.get(url, getAuthConfig());
    return response.data;
  } catch (error) {
    console.error(error);
  }
}

export const createProduct = async (url, body) => {
  try {
    const response = await axios.post(url, body, getAuthConfig());
    return response.data;
  } catch (error) {
    console.error(error);
  }
}

export const updateProduct = async (url, body) => {
  try {
    const response = await axios.put(url, body, getAuthConfig());
    return response.data;
  } catch (error) {
    console.error(error);
  }
}

export const deleteProduct = async (url) => {
  try {
    await axios.delete(url, getAuthConfig());
  } catch (error) {
    console.error(error);
  }
}