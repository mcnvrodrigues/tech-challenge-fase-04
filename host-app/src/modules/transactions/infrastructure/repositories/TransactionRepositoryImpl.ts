import { Transaction } from "../../domain/entities/Transaction";
import { TransactionRepository } from "../../domain/repositories/TransactionRepository";

const mockTransactions: Transaction[] = [
    {
        id: "1",
        description: "Depósito inicial",
        amount: 500,
        type: "deposit",
        createdAt: new Date(),
    },
];

export class TransactionRepositoryImpl implements TransactionRepository {
    async findAll(): Promise<Transaction[]> {
        return mockTransactions;
    }

    async create(transaction: Transaction): Promise<void> {
        mockTransactions.push(transaction);
    }

    async delete(id: string): Promise<void> {
        const index = mockTransactions.findIndex(item => item.id === id);

        if (index >= 0) {
            mockTransactions.splice(index, 1);
        }
    }
}