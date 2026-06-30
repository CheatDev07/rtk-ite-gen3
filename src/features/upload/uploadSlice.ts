import { createSlice } from "@reduxjs/toolkit";

const initializeValue ={
  files: []
}
// create countSlice 
export const uploadSlice = createSlice({
  name:'upload',
  initialState:initializeValue,
  reducers:{
     
  }
})
export const {
 
}= uploadSlice.actions;

export default uploadSlice.reducer;