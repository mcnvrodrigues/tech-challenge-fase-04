import { configureStore } from "@reduxjs/toolkit";
import transactionReducer from "@/modules/transactions/state/transactionSlice";
import transactionTypesReducer from "@/modules/transactions/state/transactionTypesSlice";

export const store = configureStore({
    reducer: {
        transactions: transactionReducer,
        transactionTypes: transactionTypesReducer,
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;