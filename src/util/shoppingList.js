import axios from "axios";
import { getAuthConfig } from "./token";
import { calculateNewValue } from "@testing-library/user-event/dist/utils";

export const createShoppingList = async (url, body) => {
  try {
    const response = await axios.post(
      url,
      body,
      getAuthConfig()
    );

    return response.data;
  } catch (error) {
    console.error(error);
  }
}

export const fetchShoppingList = async(url)=>{
  try{
    const response = await axios.get(url, getAuthConfig());
    return response.data;
  }catch(error){
    console.error(error);
  }
}