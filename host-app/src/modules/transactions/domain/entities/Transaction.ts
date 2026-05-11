export type TransactionType = "deposit" | "withdraw" | "transfer";

export interface Transaction {
    id: string;
    description: string;
    amount: number;
    type: TransactionType;
    createdAt: Date;
}