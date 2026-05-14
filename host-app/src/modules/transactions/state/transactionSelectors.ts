import { RootState } from "@/core/store";

export const selectTransactions = (state: RootState) =>
    state.transactions.items;

export const selectTransactionsLoading = (state: RootState) =>
    state.transactions.loading;

export const selectBalance = (state: RootState) =>
    state.transactions.items.reduce((total, transaction) => {
        return total + transaction.amount;
    }, 0);