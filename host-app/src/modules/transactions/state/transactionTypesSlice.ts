import { createSlice } from "@reduxjs/toolkit";

interface TransactionTypesState {
    types: string[];
}

const initialState: TransactionTypesState = {
    types: ["deposit", "withdraw", "transfer"],
};

const transactionTypesSlice = createSlice({
    name: "transactionTypes",
    initialState,
    reducers: {},
});

export default transactionTypesSlice.reducer;