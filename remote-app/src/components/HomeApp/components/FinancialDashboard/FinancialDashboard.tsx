import React, { useMemo } from "react";

import { Database } from "@/types";

import {
  calculateBalance,
  calculateTotalDeposits,
  calculateTotalTransfers,
} from "@/utils/financeUtils";

import { formatCurrency } from "@/utils/formatCurrency";
import { formatDateMini } from "@/utils/formatters";

import styles from "./FinancialDashboard.module.css";

export const FinancialDashboard: React.FC<Database> = ({ transaction }) => {
  const currentBalance = calculateBalance(transaction);
  const totalDeposits = calculateTotalDeposits(transaction);
  const totalTransfers = calculateTotalTransfers(transaction);

  const chartAnalysis = useMemo(() => {
    const dailyData: Record<
      string,
      { date: string; deposito: number; transferencia: number }
    > = {};

    transaction.forEach((t) => {
      if (!dailyData[t.date]) {
        dailyData[t.date] = { date: t.date, deposito: 0, transferencia: 0 };
      }

      if (t.type === "deposito") dailyData[t.date].deposito += t.value;
      else dailyData[t.date].transferencia += t.value;
    });

    const chartData = Object.values(dailyData).sort(
      (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime(),
    );

    const maxDailyValue = Math.max(
      ...chartData.map((d) => Math.max(d.deposito, d.transferencia)),
      1,
    );

    const totalVolume = totalDeposits + totalTransfers;
    const depositPct =
      totalVolume > 0 ? (totalDeposits / totalVolume) * 100 : 0;

    return {
      chartData,
      maxDailyValue,
      depositPct,
    };
  }, [transaction, totalDeposits, totalTransfers]);

  const donutGradient = {
    background: `conic-gradient(
      #10b981 0% ${chartAnalysis.depositPct}%, 
      #ef4444 ${chartAnalysis.depositPct}% 100%
    )`,
  };

  return (
    <div className={styles.container}>
      <h2 className={styles.summaryTitle}>Análise Financeira</h2>

      <div className={styles.summaryGrid}>
        <div className={styles.card}>
          <span className={styles.cardLabel}>Saldo Atual</span>
          <p
            className={`${styles.cardValue} ${
              currentBalance >= 0 ? styles.neutral : styles.negative
            }`}
          >
            {formatCurrency(currentBalance)}
          </p>
        </div>
        <div className={styles.card}>
          <span className={styles.cardLabel}>Entradas</span>
          <p className={`${styles.cardValue} ${styles.positive}`}>
            {formatCurrency(totalDeposits)}
          </p>
        </div>
        <div className={styles.card}>
          <span className={styles.cardLabel}>Saídas</span>
          <p className={`${styles.cardValue} ${styles.negative}`}>
            {formatCurrency(totalTransfers)}
          </p>
        </div>
      </div>

      <div className={styles.chartsGrid}>
        <div className={styles.chartCard}>
          <h3 className={styles.chartTitle}>Fluxo Diário</h3>
          <ul
            className={styles.barChartContainer}
            style={{ padding: 0, listStyle: "none" }}
            aria-label="Gráfico de barras mostrando fluxo diário de entradas e saídas"
          >
            {chartAnalysis.chartData.length === 0 ? (
              <li style={{ margin: "auto", color: "#999" }}>Sem dados</li>
            ) : (
              chartAnalysis.chartData.map((data) => (
                <li
                  key={data.date}
                  className={styles.barGroup}
                  tabIndex={0}
                  aria-label={`Dia ${formatDateMini(data.date)}. Entradas: ${formatCurrency(data.deposito)}. Saídas: ${formatCurrency(data.transferencia)}.`}
                >
                  <div className={styles.tooltip} aria-hidden="true">
                    {formatDateMini(data.date)}
                    <br />
                    Ent: {formatCurrency(data.deposito)}
                    <br />
                    Sai: {formatCurrency(data.transferencia)}
                  </div>
                  <div className={styles.barsWrapper} aria-hidden="true">
                    <div
                      className={`${styles.bar} ${styles.barDeposit}`}
                      style={{
                        height: `${
                          (data.deposito / chartAnalysis.maxDailyValue) * 100
                        }%`,
                      }}
                    />
                    <div
                      className={`${styles.bar} ${styles.barTransfer}`}
                      style={{
                        height: `${
                          (data.transferencia / chartAnalysis.maxDailyValue) *
                          100
                        }%`,
                      }}
                    />
                  </div>
                  <span className={styles.barDate} aria-hidden="true">
                    {formatDateMini(data.date)}
                  </span>
                </li>
              ))
            )}
          </ul>
        </div>

        <div className={styles.chartCard}>
          <h3 className={styles.chartTitle}>Distribuição</h3>
          <div className={styles.donutContainer}>
            <div
              className={styles.donutChart}
              style={donutGradient}
              role="img"
              aria-label={`Gráfico de distribuição. ${Math.round(chartAnalysis.depositPct)}% Entradas e ${100 - Math.round(chartAnalysis.depositPct)}% Saídas.`}
            >
              <div className={styles.donutHole}>
                <span className={styles.donutLabel} aria-hidden="true">
                  Entradas
                </span>
                <span className={styles.donutValue} aria-hidden="true">
                  {Math.round(chartAnalysis.depositPct)}%
                </span>
              </div>
            </div>
            <div className={styles.legend} aria-hidden="true">
              <div className={styles.legendItem}>
                <div className={`${styles.dot} ${styles.barDeposit}`}></div>
                Entradas
              </div>
              <div className={styles.legendItem}>
                <div className={`${styles.dot} ${styles.barTransfer}`}></div>
                Saídas
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FinancialDashboard;
