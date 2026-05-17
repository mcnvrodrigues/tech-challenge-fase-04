import { Transaction } from "../../domain/entities/Transaction";

interface TransactionAppProps {
    transactions: Transaction[];
}

export function TransactionApp({
    transactions,
}: TransactionAppProps) {
    return (
        <div>
            <h1>Transações</h1>

            {transactions.map(transaction => (
                <div
                    key={transaction.id}
                    style={{
                        border: "1px solid #ccc",
                        padding: "12px",
                        marginBottom: "12px",
                        borderRadius: "8px",
                    }}
                >
                    <strong>{transaction.description}</strong>

                    <p>
                        Valor:
                        {" "}
                        R$
                        {" "}
                        {transaction.amount}
                    </p>

                    <p>Tipo: {transaction.type}</p>

                    <p>
                        Data:
                        {" "}
                        {transaction.createdAt.toLocaleDateString()}
                    </p>
                </div>
            ))}
        </div>
    );
}