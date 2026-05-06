import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Transaction } from "@/types"; 

interface TransactionsState {
  items: Transaction[];
}

const initialState: TransactionsState = {
  items: [],
};

const transactionSlice = createSlice({
  name: "transactions",
  initialState,
  reducers: {
    setTransactions: (state, action: PayloadAction<Transaction[]>) => {
      state.items = action.payload;
    },
    addTransaction: (state, action: PayloadAction<Transaction>) => {
      state.items.push(action.payload);
    },
    updateTransaction: (state, action: PayloadAction<Transaction>) => {
       const index = state.items.findIndex(t => t.id === action.payload.id);
       if(index !== -1) {
           state.items[index] = action.payload;
       }
    },
    deleteTransaction: (state, action: PayloadAction<number>) => {
      state.items = state.items.filter((t) => t.id !== action.payload);
    },
  },
});

export const { setTransactions, addTransaction, updateTransaction, deleteTransaction } = transactionSlice.actions;
export default transactionSlice.reducer;