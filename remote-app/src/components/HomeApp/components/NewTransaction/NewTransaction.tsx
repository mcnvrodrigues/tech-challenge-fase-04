"use client";

import { TransactionType, NewTransactionProps } from "@/types";

import style from "./NewTransaction.module.css";

interface NewTransactionPropsExtended extends NewTransactionProps {
  selectedFile?: File | null;
  onClearFile?: () => void;
}

export default function NewTransaction({
  title,
  type,
  value,
  description,
  onTypeChange,
  onValueChange,
  onDescriptionChange,
  onFileChange,
  onSubmit,
  disabled = false,
  currentFile,
  selectedFile,
  onClearFile,
  transactionTypeOptions = [],
}: NewTransactionPropsExtended) {
  const handleValorChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const apenasNumeros = e.target.value.replace(/[^0-9.,]/g, "");
    onValueChange(apenasNumeros);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (onFileChange) {
      const file = e.target.files ? e.target.files[0] : null;
      onFileChange(file);
    }
  };

  const hasFile = !!currentFile || !!selectedFile;

  return (
    <div className={style.newTransaction}>
      <h3>{title}</h3>

      <select
        aria-label="Tipo de transação"
        value={type}
        onChange={(e) => onTypeChange(e.target.value as TransactionType)}
        disabled={disabled}
      >
        <option value="">Selecione o tipo de transação</option>
        {transactionTypeOptions?.map((t: string) => (
          <option key={t} value={t}>
            {t}
          </option>
        ))}
      </select>

      <p>Valor</p>
      <input
        aria-label="Valor da transação"
        type="text"
        placeholder="10,00"
        value={value}
        onChange={handleValorChange}
        disabled={disabled}
      />

      <input
        aria-label="Descrição da transação"
        type="text"
        placeholder="Descrição (opcional)"
        value={description}
        onChange={(e) => onDescriptionChange(e.target.value)}
        disabled={disabled}
      />

      <div className={style.receiptContainer}>
        <p className={style.receiptLabel}>Comprovante</p>

        {hasFile ? (
          <div className={style.fileBox}>
            <div className={style.fileInfo}>
              <span className={style.fileIcon}>📄</span>

              {selectedFile ? (
                <span className={style.fileName}>
                  {selectedFile.name} (Novo)
                </span>
              ) : (
                <a
                  href={currentFile || "#"}
                  download="comprovante"
                  className={style.fileLink}
                >
                 Ver Comprovante Salvo
                </a>
              )}
            </div>

            <button
              type="button"
              onClick={onClearFile}
              disabled={disabled}
              title="Remover arquivo"
              className={style.removeButton}
            >
              ✕
            </button>
          </div>
        ) : (
          <input
            aria-label="Upload de comprovante"
            type="file"
            onChange={handleFileChange}
            disabled={disabled}
            accept="image/*,.pdf"
            className={style.input}
          />
        )}
      </div>

      <button className={style.button} onClick={onSubmit} disabled={disabled}>
        Concluir transação
      </button>
    </div>
  );
}
