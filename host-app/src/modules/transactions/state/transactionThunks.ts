import { createAsyncThunk } from "@reduxjs/toolkit";
import { GetTransactionsUseCase } from "../domain/usecases/GetTransactionsUseCase";
import { TransactionRepositoryImpl } from "../infrastructure/repositories/TransactionRepositoryImpl";

export const fetchTransactions = createAsyncThunk(
    "transactions/fetchTransactions",
    async () => {
        const repository = new TransactionRepositoryImpl();
        const useCase = new GetTransactionsUseCase(repository);

        return await useCase.execute();
    }
);