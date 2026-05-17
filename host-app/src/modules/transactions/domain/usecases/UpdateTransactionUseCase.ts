import { Transaction } from "../entities/Transaction";
import { TransactionRepository } from "../repositories/TransactionRepository";

export class UpdateTransactionUseCase {
    constructor(private repository: TransactionRepository) { }

    async execute(transaction: Transaction) {
        return this.repository.update(transaction);
    }
}