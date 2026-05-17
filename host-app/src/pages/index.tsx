import Head from "next/head";
import dynamic from "next/dynamic";
import { useState, useEffect } from "react";
import { GetStaticProps } from "next";
//import { useDispatch, useSelector } from "react-redux";
import { useSelector } from "react-redux";
import { useAppDispatch } from "@/core/store/hooks";

import { RootState } from "@/store/";
//import { addTransaction, updateTransaction, deleteTransaction } from "@/transactionTypes/transactionSlice";
import {
  addTransaction,
  updateTransaction,
  deleteTransaction,
} from "@/modules/transactions/state/transactionThunks";

import { useIsMobile } from "@/hooks/useIsMobile";
//import { useTransactions } from "@/hooks/useTransactions";
import { useTransactions } from "@/modules/transactions/presentation/hooks/useTransactions";

import { HomeAppProps } from "@/types";

import { calculateBalance } from "@/utils/calculateBalance";
import { displayDate } from "@/utils/formatDate";

import Loading from "@/components/Loading/Loading";

import style from "@/styles/home.module.css";

const LoadingFallback = () => <Loading />;

const Menu = dynamic(() => import("remoteApp/Menu"), { ssr: false, loading: () => <Loading /> });


const HomeApp = dynamic<HomeAppProps>(() => import("remoteApp/HomeApp"), {
  ssr: false,
  loading: () => <LoadingFallback />,
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

export default function Home() {
  //const dispatch = useDispatch();
  const dispatch = useAppDispatch();
  //const { transactions } = useTransactions();
  const { transactions, balance, loading } = useTransactions();

  const transactionTypesList = useSelector((state: RootState) => state.transactionTypes.types);

  const isMobile = useIsMobile();

  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const balanceValue = calculateBalance(transactions);

  if (!isMounted) {
    return null;
  }

  const transactionsForHome = transactions.map(transaction => ({
    id: Number(transaction.id),
    type: transaction.type === "deposit" ? "deposito" : "transferencia",
    value: transaction.amount,
    description: transaction.description,
    date: transaction.createdAt.toISOString().split("T")[0],
  }));

  return (
    <>
      <Head>
        <title>Home</title>
        <meta name="description" content="Home - Projeto Financeiro" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <div className={style.layout}>
          {!isMobile && <Menu />}

          <HomeApp
            transactions={transactionsForHome}
            balance={balance ?? 0}
            dateString={displayDate}
            transactionTypeOptions={transactionTypesList}
            /* onCreate={(data) => {
              const newTransaction = { id: Date.now(), ...data };
              dispatch(addTransaction(newTransaction));
            }} */
            onCreate={data => {
              dispatch(
                addTransaction({
                  id: String(Date.now()),
                  type: mapHomeTypeToDomain(data.type),
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
      </main>
    </>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  return {
    props: {},
  };
};
