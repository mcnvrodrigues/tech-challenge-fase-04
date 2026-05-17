import { createSlice } from "@reduxjs/toolkit";
import { Transaction } from "../domain/entities/Transaction";
import {
    addTransaction,
    deleteTransaction,
    fetchTransactions,
    updateTransaction,
} from "./transactionThunks";

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
                state.error = null;
            })
            .addCase(fetchTransactions.fulfilled, (state, action) => {
                state.loading = false;
                state.items = action.payload;
            })
            .addCase(fetchTransactions.rejected, state => {
                state.loading = false;
                state.error = "Erro ao carregar transações";
            })

            .addCase(addTransaction.fulfilled, (state, action) => {
                state.items.push(action.payload);
            })

            .addCase(updateTransaction.fulfilled, (state, action) => {
                const index = state.items.findIndex(
                    transaction => transaction.id === action.payload.id
                );

                if (index >= 0) {
                    state.items[index] = action.payload;
                }
            })

            .addCase(deleteTransaction.fulfilled, (state, action) => {
                state.items = state.items.filter(
                    transaction => transaction.id !== action.payload
                );
            });
    },
});

export default transactionSlice.reducer;