import { createSlice } from "@reduxjs/toolkit";
import { Transaction } from "../domain/entities/Transaction";
import { fetchTransactions } from "./transactionThunks";

interface TransactionState {
    items: Transaction[];
    loading: boolean;
    error: string | null;
}

const initialState: TransactionState = {
    items: [],
    loading: false,
    error: null,
};

const transactionSlice = createSlice({
    name: "transactions",
    initialState,
    reducers: {},
    extraReducers: builder => {
        builder
            .addCase(fetchTransactions.pending, state => {
                state.loading = true;
            })
            .addCase(fetchTransactions.fulfilled, (state, action) => {
                state.loading = false;
                state.items = action.payload;
            })
            .addCase(fetchTransactions.rejected, state => {
                state.loading = false;
                state.error = "Erro ao carregar transações";
            });
    },
});

export default transactionSlice.reducer;