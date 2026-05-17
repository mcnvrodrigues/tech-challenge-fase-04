import { RootState } from "@/core/store";

export const selectTransactions = (state: RootState) =>
    state.transactions.items;

export const selectTransactionsLoading = (state: RootState) =>
    state.transactions.loading;

export const selectTransactionsError = (state: RootState) =>
    state.transactions.error;

export const selectBalance = (state: RootState) =>
    state.transactions.items.reduce((total, transaction) => {
        switch (transaction.type) {
            case "deposit":
                return total + transaction.amount;

            case "transfer":
            case "withdraw":
                return total - transaction.amount;

            default:
                return total;
        }
    }, 0);