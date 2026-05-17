import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "@/core/store/hooks";
import { fetchTransactions } from "../../state/transactionThunks";
import {
    selectBalance,
    selectTransactions,
    selectTransactionsError,
    selectTransactionsLoading,
} from "../../state/transactionSelectors";

export function useTransactions() {
    const dispatch = useAppDispatch();

    const transactions = useAppSelector(selectTransactions);
    const loading = useAppSelector(selectTransactionsLoading);
    const error = useAppSelector(selectTransactionsError);
    const balance = useAppSelector(selectBalance);

    useEffect(() => {
        dispatch(fetchTransactions());
    }, [dispatch]);

    return {
        transactions,
        loading,
        error,
        balance,
    };
}