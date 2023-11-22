import { createSlice } from "@reduxjs/toolkit";

const initialState = {};

const shoppingListsSlice = createSlice({
  name: "shoppingLists",
  initialState,
  reducers: {
    setShoppingList(state, action) {
      const list = action.payload;
      const id = list.id;

      state[id] = {
        id: id,
        name: list.name,
        timeBought: list.timeBought,
        links: list._links,
      }
    },
    removeShoppingList(state, action) {
      const id = action.payload.id;

      if (state[id]) {
        delete state[id];
      }
    }
  }
})

export const { setShoppingList, removeShoppingList } = shoppingListsSlice.actions;
export default shoppingListsSlice.reducer;