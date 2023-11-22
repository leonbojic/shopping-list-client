import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  createList: null,
};


const linksSlice = createSlice({
  name: "links",
  initialState,
  reducers: {
    setCreateList(state, action) {
      state.createList = action.payload;
    }
  }
})

export const {setCreateList} = linksSlice.actions;
export default linksSlice.reducer;