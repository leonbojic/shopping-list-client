import { configureStore } from "@reduxjs/toolkit"
import shoppingListsSlice from "./shoppingListsSlice"


const store = configureStore({
  reducer: {
    shoppingLists: shoppingListsSlice,
  }
})

export default store;