import { useEffect, useRef, useState } from "react";

import Image from "next/image";

import { TransactionsListProps } from "@/types";

import { formatDate, formatCurrency } from "@/utils/formatters";
import { getMonthName } from "@/utils/getMonthName";
import { AdjustTypesNames } from "@/utils/adjustTypesName";

import style from "./TransactionsList.module.css";

const ITEMS_PER_LOAD = 5;

const TransactionsList = ({
  transactions,
  title,
  onEditClick,
  onDeleteClick,
}: TransactionsListProps) => {
  const [visibleCount, setVisibleCount] = useState(ITEMS_PER_LOAD);
  const loaderRef = useRef<HTMLDivElement | null>(null);

  const visibleTransactions = transactions.slice(0, visibleCount);

  useEffect(() => {
    // Reseta o scroll quando a lista mudar (ex: filtro)
    setVisibleCount(ITEMS_PER_LOAD);
  }, [transactions]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisibleCount((prev) =>
            Math.min(prev + ITEMS_PER_LOAD, transactions.length),
          );
        }
      },
      { threshold: 1 },
    );

    if (loaderRef.current) observer.observe(loaderRef.current);

    return () => observer.disconnect();
  }, [transactions.length]);

  if (transactions.length === 0) {
    return <p>Nenhuma transação encontrada.</p>;
  }

  return (
    <section
      className={style.transactionsList}
      aria-live="polite"
      aria-atomic="true"
    >
      <h1 className={style.transactionsListTitle}>{title}</h1>

      <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
        {visibleTransactions.map((transaction) => {
          const descriptionLabel = transaction.description || "sem descrição";
          return (
            <li key={transaction.id} className={style.transactionItem}>
              <div className={style.transactionHeader}>
                <h2 className={style.transactionMonth}>
                  {getMonthName(transaction.date)}
                </h2>

                <div className={style.transactionActions}>
                  <button
                    className={style.transactionEdit}
                    onClick={() => onEditClick(transaction)}
                    aria-label={`Editar transação: ${descriptionLabel}`}
                  >
                    <Image
                      className={style.image}
                      src="/edit.png"
                      width={16}
                      height={16}
                      alt=""
                    />
                  </button>

                  <button
                    className={style.transactionDelete}
                    onClick={() => onDeleteClick(transaction)}
                    aria-label={`Excluir transação: ${descriptionLabel}`}
                  >
                    <Image
                      className={style.image}
                      src="/delete-icon.png"
                      width={16}
                      height={16}
                      alt=""
                    />
                  </button>
                </div>
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

      <div ref={loaderRef} style={{ height: 1 }} />

      {visibleCount < transactions.length && (
        <p className={style.loading}>Carregando mais...</p>
      )}
    </section>
  );
};

export default TransactionsList;
