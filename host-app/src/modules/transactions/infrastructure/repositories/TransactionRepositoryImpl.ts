import { Transaction } from "../../domain/entities/Transaction";
import { TransactionRepository } from "../../domain/repositories/TransactionRepository";

const STORAGE_KEY = "transactions:v1";

export class TransactionRepositoryImpl implements TransactionRepository {
    async findAll(): Promise<Transaction[]> {
        if (typeof window === "undefined") {
            return [];
        }

        const storedTransactions = localStorage.getItem(STORAGE_KEY);

        if (!storedTransactions) {
            return [];
        }

        const parsedTransactions = JSON.parse(storedTransactions);

        return parsedTransactions.map((transaction: any) => ({
            id: String(transaction.id),
            description: transaction.description || "Sem descrição",
            amount: Number(transaction.value ?? transaction.amount ?? 0),
            type: mapTransactionType(transaction.type),
            createdAt: new Date(transaction.date ?? transaction.createdAt),
        }));
    }

    async create(transaction: Transaction): Promise<void> {
        if (typeof window === "undefined") {
            return;
        }

        const storedTransactions = localStorage.getItem(STORAGE_KEY);
        const transactions = storedTransactions ? JSON.parse(storedTransactions) : [];

        const newTransaction = mapTransactionToStorage(transaction);

        localStorage.setItem(
            STORAGE_KEY,
            JSON.stringify([...transactions, newTransaction])
        );
    }

    async update(transaction: Transaction): Promise<void> {
        if (typeof window === "undefined") {
            return;
        }

        const storedTransactions = localStorage.getItem(STORAGE_KEY);
        const transactions = storedTransactions ? JSON.parse(storedTransactions) : [];

        const updatedTransactions = transactions.map((item: any) => {
            if (String(item.id) === String(transaction.id)) {
                return mapTransactionToStorage(transaction);
            }

            return item;
        });

        localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedTransactions));
    }

    async delete(id: string): Promise<void> {
        if (typeof window === "undefined") {
            return;
        }

        const storedTransactions = localStorage.getItem(STORAGE_KEY);
        const transactions = storedTransactions ? JSON.parse(storedTransactions) : [];

        const updatedTransactions = transactions.filter(
            (transaction: any) => String(transaction.id) !== String(id)
        );

        localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedTransactions));
    }
}

function mapTransactionType(type: string): Transaction["type"] {
    const normalizedType = String(type)
        .toLowerCase()
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "");

    if (normalizedType === "deposito" || normalizedType === "deposit") {
        return "deposit";
    }

    if (
        normalizedType === "transferencia" ||
        normalizedType === "transfer"
    ) {
        return "transfer";
    }

    return "withdraw";
}

function mapTransactionTypeToStorage(type: Transaction["type"]) {
    switch (type) {
        case "deposit":
            return "deposito";
        case "transfer":
            return "transferencia";
        case "withdraw":
        default:
            return "saque";
    }
}

function mapTransactionToStorage(transaction: Transaction) {
    return {
        id: Number(transaction.id),
        type: mapTransactionTypeToStorage(transaction.type),
        value: transaction.amount,
        description: transaction.description,
        date: transaction.createdAt.toISOString().split("T")[0],
        attachment: null,
    };
}