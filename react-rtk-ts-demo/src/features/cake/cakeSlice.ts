import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type InitialState = {
  numOfCakes: number;
};

const initialState: InitialState = {
  numOfCakes: 10,
};

const cakeSlice = createSlice({
  name: "cake",
  initialState,
  reducers: {
    ordered: (state) => {
      state.numOfCakes = state.numOfCakes - 1;
    },
    restocked: (state, action: PayloadAction<number>) => {
      state.numOfCakes = state.numOfCakes + action.payload;
    },
  },
});

export default cakeSlice.reducer;
export const { ordered, restocked } = cakeSlice.actions;
