import { TransactionsListHomeProps } from "@/types";

import { getMonthName } from "@/utils/getMonthName";
import { AdjustTypesNames } from "@/utils/adjustTypesName";
import { formatDate, formatCurrency } from "@/utils/formatters";

import Link from "next/link";

import style from "./TransactionsListHome.module.css";

const TransactionsListHome = ({ transaction, title }: TransactionsListHomeProps) => {
  if (transaction.length === 0) {
    return (
      <section className={style.transactionsListHome} aria-label={title}>
         <h2 className={style.transactionTitle}>{title}</h2>
         <p>Nenhuma transação encontrada.</p>
      </section>
    );
  }

  return (
    <section className={style.transactionsListHome} aria-label="Resumo das últimas transações">
      <h2 className={style.transactionTitle}>{title}</h2>
      
      <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
        {transaction.map((transaction) => {
          return (
            <li key={transaction.id} className={style.transactionItem}>
              <div className={style.transactionHeader}>
                <h3 className={style.transactionMonth}>
                  {getMonthName(transaction.date)}
                </h3>
              </div>
              <div className={style.transactionInfo}>
                <p className={style.transactionType}>
                  {AdjustTypesNames(transaction.type)}
                </p>
                <p className={style.transactionDate}>
                  {formatDate(transaction.date)}
                </p>
              </div>
              <div className={style.transactionValueAndDesc}>
                <p className={style.transactionDesc}>
                  {transaction.description || ""}
                </p>
                <p className={style.transactionValue}>
                  {formatCurrency(transaction.value)}
                </p>
              </div>
            </li>
          );
        })}
      </ul>

      <Link href="/transacoes" className={style.transactionLink}>
        Ver mais transações
      </Link>
    </section>
  );
};

export default TransactionsListHome;