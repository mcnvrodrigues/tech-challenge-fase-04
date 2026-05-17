import { createAsyncThunk } from "@reduxjs/toolkit";

import { Transaction } from "../domain/entities/Transaction";

import { GetTransactionsUseCase } from "../domain/usecases/GetTransactionsUseCase";
import { AddTransactionUseCase } from "../domain/usecases/AddTransactionUseCase";
import { UpdateTransactionUseCase } from "../domain/usecases/UpdateTransactionUseCase";
import { DeleteTransactionUseCase } from "../domain/usecases/DeleteTransactionUseCase";

import { TransactionRepositoryImpl } from "../infrastructure/repositories/TransactionRepositoryImpl";

export const fetchTransactions = createAsyncThunk(
    "transactions/fetchTransactions",
    async () => {
        const repository = new TransactionRepositoryImpl();
        const useCase = new GetTransactionsUseCase(repository);

        return await useCase.execute();
    }
);

export const addTransaction = createAsyncThunk(
    "transactions/addTransaction",
    async (transaction: Transaction) => {
        const repository = new TransactionRepositoryImpl();
        const useCase = new AddTransactionUseCase(repository);

        await useCase.execute(transaction);

        return transaction;
    }
);

export const updateTransaction = createAsyncThunk(
    "transactions/updateTransaction",
    async (transaction: Transaction) => {
        const repository = new TransactionRepositoryImpl();
        const useCase = new UpdateTransactionUseCase(repository);

        await useCase.execute(transaction);

        return transaction;
    }
);

export const deleteTransaction = createAsyncThunk(
    "transactions/deleteTransaction",
    async (id: string) => {
        const repository = new TransactionRepositoryImpl();
        const useCase = new DeleteTransactionUseCase(repository);

        await useCase.execute(id);

        return id;
    }
);