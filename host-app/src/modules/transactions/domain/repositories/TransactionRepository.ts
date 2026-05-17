import { Transaction } from "../entities/Transaction";

export interface TransactionRepository {
    findAll(): Promise<Transaction[]>;
    create(transaction: Transaction): Promise<void>;
    update(transaction: Transaction): Promise<void>;
    delete(id: string): Promise<void>;
}