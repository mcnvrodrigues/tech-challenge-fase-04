// host/utils/calculateBalance.ts
import { Transaction } from "@/types";

export function calculateBalance(transactions: Transaction[]): number {
  return transactions.reduce((total, transaction) => {
    if (transaction.type === "deposito") {
      return total + transaction.value;
    }

    if (transaction.type === "transferencia") {
      return total - transaction.value;
    }

    return total;
  }, 0);
}
