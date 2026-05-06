import { createSlice } from "@reduxjs/toolkit";

interface TransactionTypesState {
  types: string[];
}

const initialState: TransactionTypesState = {
  types: ["deposito", "transferencia"],
};

const transactionTypeSlice = createSlice({
  name: "transactionTypes",
  initialState,
  reducers: {},
});

export default transactionTypeSlice.reducer;
