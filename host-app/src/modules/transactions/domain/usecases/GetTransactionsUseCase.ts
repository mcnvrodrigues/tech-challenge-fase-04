import { TransactionRepository } from "../repositories/TransactionRepository";

export class GetTransactionsUseCase {
    constructor(private repository: TransactionRepository) { }

    async execute() {
        return this.repository.findAll();
    }
}