import { configureStore } from "@reduxjs/toolkit"
import shoppingListsSlice from "./shoppingListsSlice"
import linksSlice from "./linksSlice";


const store = configureStore({
  reducer: {
    links: linksSlice,
    shoppingLists: shoppingListsSlice,
  }
})

export default store;