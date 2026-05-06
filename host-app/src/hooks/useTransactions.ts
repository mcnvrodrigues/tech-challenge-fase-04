import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { transactionsMock } from "@/mocks/transactions";
import { RootState } from "@/store/";
import { setTransactions } from '@/transactionTypes/transactionSlice';

const STORAGE_KEY = "transactions:v1";

export function useTransactions() {
  const dispatch = useDispatch();

  const transactions = useSelector((state: RootState) => state.transactions.items);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const stored = localStorage.getItem(STORAGE_KEY);

      if (stored) {
        dispatch(setTransactions(JSON.parse(stored)));
      } else {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(transactionsMock));
        dispatch(setTransactions(transactionsMock));
      }
    }
  }, [dispatch]);

  useEffect(() => {
    if (transactions.length > 0) { 
        localStorage.setItem(STORAGE_KEY, JSON.stringify(transactions));
    }
  }, [transactions]);

  return { transactions };
}