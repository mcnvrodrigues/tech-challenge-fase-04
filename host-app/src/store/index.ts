import { configureStore } from "@reduxjs/toolkit";

import transactionTypesReducer from "@/transactionTypes/transactionTypeSlice"

import transactionsReducer from "@/transactionTypes/transactionSlice"; 

const store = configureStore({
  reducer: {
    transactionTypes: transactionTypesReducer, 
    transactions: transactionsReducer, 
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;