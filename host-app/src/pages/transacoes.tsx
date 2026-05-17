import Head from "next/head";
import dynamic from "next/dynamic";
import { useState, useEffect } from "react";

import { useIsMobile } from "@/hooks/useIsMobile";
import { useTransactions } from "@/modules/transactions/presentation/hooks/useTransactions";

import { useAppDispatch } from "@/core/store/hooks";

import {
  addTransaction,
  updateTransaction,
  deleteTransaction,
} from "@/modules/transactions/state/transactionThunks";

import { displayDate } from "@/utils/formatDate";
import { TransactionAppProps } from "@/types";
import Loading from "@/components/Loading/Loading";

import style from "@/styles/transacoes.module.css";

const LoadingFallback = () => <Loading />;

const Menu = dynamic(() => import("remoteApp/Menu"), {
  ssr: false,
  loading: () => <Loading />,
});

function mapHomeTypeToDomain(type: string) {
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

const TransactionApp = dynamic<TransactionAppProps>(
  () =>
    import("remoteApp/TransactionApp") as Promise<{
      default: React.ComponentType<TransactionAppProps>;
    }>,
  {
    ssr: false,
    loading: () => <LoadingFallback />,
  }
);

export default function Transacoes() {
  const dispatch = useAppDispatch();

  const { transactions } = useTransactions();
  const isMobile = useIsMobile();

  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  const transactionsForRemote = transactions.map(transaction => ({
    id: Number(transaction.id),
    type: transaction.type === "deposit" ? "deposito" : "transferencia",
    value: transaction.amount,
    description: transaction.description,
    date: transaction.createdAt.toISOString().split("T")[0],
    attachment: null,
  }));

  return (
    <>
      <Head>
        <title>Transações</title>
        <meta name="description" content="Transações - Projeto Financeiro" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <section className={style.containerStatement}>
          {!isMobile && <Menu />}

          <div className={style.boxStatement}>
            <TransactionApp
              transactions={transactionsForRemote}
              dateString={displayDate}
              onCreate={data => {
                dispatch(
                  addTransaction({
                    id: String(Date.now()),
                    type:
                      data.type === "deposito"
                        ? "deposit"
                        : "transfer",
                    amount: Number(data.value),
                    description: data.description,
                    createdAt: new Date(data.date),
                  })
                );
              }}
              onUpdate={updated => {
                dispatch(
                  updateTransaction({
                    id: String(updated.id),
                    type: mapHomeTypeToDomain(updated.type),
                    amount: Number(updated.value),
                    description: updated.description,
                    createdAt: new Date(updated.date),
                  })
                );
              }}
              onDelete={id => {
                dispatch(deleteTransaction(String(id)));
              }}
            />
          </div>
        </section>
      </main>
    </>
  );
}