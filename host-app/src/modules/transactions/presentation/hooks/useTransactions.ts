import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "@/app/store/hooks";
import { fetchTransactions } from "../../state/transactionThunks";
import {
    selectBalance,
    selectTransactions,
    selectTransactionsLoading,
} from "../../state/transactionSelectors";

export function useTransactions() {
    const dispatch = useAppDispatch();

    const transactions = useAppSelector(selectTransactions);
    const loading = useAppSelector(selectTransactionsLoading);
    const balance = useAppSelector(selectBalance);

    useEffect(() => {
        dispatch(fetchTransactions());
    }, [dispatch]);

    return {
        transactions,
        loading,
        balance,
    };
}