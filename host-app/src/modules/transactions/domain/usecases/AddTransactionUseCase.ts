import { Transaction } from "../entities/Transaction";
import { TransactionRepository } from "../repositories/TransactionRepository";

export class AddTransactionUseCase {
    constructor(private repository: TransactionRepository) { }

    async execute(transaction: Transaction) {
        return this.repository.create(transaction);
    }
}