import { useTransactions } from "../hooks/useTransactions";

export function TransactionsPage() {
    const { transactions, loading, balance } = useTransactions();

    if (loading) {
        return <p>Carregando transações...</p>;
    }

    return (
        <main>
            <h1>Transações</h1>

            <strong>Saldo: R$ {balance.toFixed(2)}</strong>

            <ul>
                {transactions.map(transaction => (
                    <li key={transaction.id}>
                        {transaction.description} - R$ {transaction.amount.toFixed(2)}
                    </li>
                ))}
            </ul>
        </main>
    );
}