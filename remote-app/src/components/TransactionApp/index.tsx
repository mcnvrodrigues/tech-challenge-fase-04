import { useState } from "react";

import { Transaction, TransactionType } from "@/types";

import SuccessModal from "../SuccessModal/SuccessModal";
import Modal from "../HomeApp/components/Modal/Modal";
import NewTransaction from "../HomeApp/components/NewTransaction/NewTransaction";
import DeleteTransaction from "../DeleteTransaction/DeleteTransaction";
import TransactionsList from "./components/TransactionsList/TransactionsList";

import { sortTransactionsByDate } from "@/utils/transactions";

import style from "./TransactionApp.module.css";

type FilterType = "todos" | TransactionType;

const MAX_FILE_SIZE = 2 * 1024 * 1024;

const convertFileToBase64 = (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = (error) => reject(error);
  });
};

export type TransactionAppProps = {
  transactions: Transaction[];
  dateString: string;
  transactionTypeOptions: string[];
  onCreate(transaction: Omit<Transaction, "id">): void;
  onUpdate(transaction: Transaction): void;
  onDelete(id: number): void;
};

function TransactionApp({
  transactions,
  dateString,
  transactionTypeOptions,
  onCreate,
  onUpdate,
  onDelete,
}: TransactionAppProps) {

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [selectedTransaction, setSelectedTransaction] =
    useState<Transaction | null>(null);
  const [editType, setEditType] = useState<TransactionType>("deposito");
  const [editValue, setEditValue] = useState("");
  const [editDescription, setEditDescription] = useState("");
  const [editFile, setEditFile] = useState<File | null>(null);
  const [existingAttachment, setExistingAttachment] = useState<string | null>(
    null,
  );
  const [isModalSucessOpen, setIsModalSucessOpen] = useState(false);
  const [modalMessage, setModalMessage] = useState("");
  const [modalTitle, setModalTitle] = useState("Sucesso!");
  const [filter, setFilter] = useState<FilterType>("todos");

  const handleEdited = () => {
    setIsModalSucessOpen(true);
    setModalTitle("Sucesso!!!");
    setModalMessage("Transação editada com sucesso!");
  };

  const handleDeleted = () => {
    setIsModalSucessOpen(true);
    setModalTitle("Sucesso!!!");
    setModalMessage("Transação deletada com sucesso!");
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedTransaction(null);
    setEditValue("");
    setEditDescription("");
    setEditFile(null);
  };

  const handleDeleteClick = (transaction: Transaction) => {
    setSelectedTransaction(transaction);
    setIsDeleteModalOpen(true);
  };

  const handleEditFileSelect = (selectedFile: File | null) => {
    if (selectedFile && selectedFile.size > MAX_FILE_SIZE) {
      setModalTitle("Erro no Arquivo");
      setModalMessage("O arquivo é muito grande! O limite é de 2MB.");
      setIsModalSucessOpen(true);
      setEditFile(null);
      return;
    }
    setEditFile(selectedFile);
  };

  const handleClearEditFile = () => {
    if (editFile) {
      setEditFile(null);
    } else {
      setExistingAttachment(null);
    }
  };

  const handleEditClick = (transaction: Transaction) => {
    setSelectedTransaction(transaction);
    setEditType(transaction.type);
    setEditValue(String(transaction.value));
    setEditDescription(transaction.description || "");
    setEditFile(null);
    setExistingAttachment(transaction.attachment || null);
    setIsModalOpen(true);
  };

  const handleEditSubmit = async () => {
    if (!selectedTransaction) return;

    setIsSubmitting(true);
    try {
      const numericValue = Number(editValue.replace(",", "."));

      let finalAttachment = selectedTransaction.attachment;

      if (editFile) {
        finalAttachment = await convertFileToBase64(editFile);
      } else if (existingAttachment) {
        finalAttachment = existingAttachment;
      } else {
        finalAttachment = "";
      }

      const updatedTransaction: Transaction = {
        ...selectedTransaction, // mantém id e date
        type: editType,
        value: numericValue,
        description: editDescription,
        attachment: finalAttachment,
      };

      onUpdate(updatedTransaction);

      handleCloseModal();
      handleEdited();
    } catch (err) {
      console.error("Erro ao editar transação:", err);
      setModalTitle("Erro");
      setModalMessage("Erro ao processar a edição.");
      setIsModalSucessOpen(true);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCloseDeleteModal = () => {
    setIsDeleteModalOpen(false);
  };

  const handleCancelDeleteSubmit = () => {
    handleCloseDeleteModal();
  };

  const handleDeleteSubmit = () => {
    if (!selectedTransaction) return;

    setIsSubmitting(true);

    try {
      onDelete(selectedTransaction.id);

      handleCloseDeleteModal();
      handleDeleted();
    } catch (err) {
      console.error("Erro ao deletar transação:", err);
    } finally {
      setIsSubmitting(false);
    }
  };

  const filteredTransactions = (() => {
    const sorted = sortTransactionsByDate(transactions);

    if (filter === "todos") return sorted;

    return sorted.filter((transaction) => transaction.type === filter);
  })();

  return (
    <>
      <section className={style.filterSection}>
        <p className={style.filterTexto}>Filtro: </p>
        <nav aria-label="Filtro de Transações" className={style.filterNav}>
          <button
            className={style.filterButton}
            onClick={() => setFilter("todos")}
            aria-pressed={filter === "todos"}
          >
            Todos
          </button>

          <button
            className={style.filterButton}
            onClick={() => setFilter("deposito")}
            aria-pressed={filter === "deposito"}
          >
            Depósitos
          </button>

          <button
            className={style.filterButton}
            onClick={() => setFilter("transferencia")}
            aria-pressed={filter === "transferencia"}
          >
            Transferências
          </button>
        </nav>
      </section>

      <TransactionsList
        title="Extrato"
        transactions={filteredTransactions}
        onEditClick={handleEditClick}
        onDeleteClick={handleDeleteClick}
      />

      <Modal isOpen={isModalOpen} onClose={handleCloseModal}>
        <NewTransaction
          title="Editar Transação"
          transactionTypeOptions={transactionTypeOptions} 
          type={editType}
          value={editValue}
          description={editDescription}
          onTypeChange={setEditType}
          onValueChange={setEditValue}
          onDescriptionChange={setEditDescription}
          onFileChange={handleEditFileSelect}
          currentFile={existingAttachment}
          selectedFile={editFile}
          onClearFile={handleClearEditFile}
          onSubmit={handleEditSubmit}
          disabled={isSubmitting}
        />
      </Modal>

      <Modal isOpen={isDeleteModalOpen} onClose={handleCloseDeleteModal}>
        <DeleteTransaction
          title="Deseja realmente deletar a transação?"
          onCancelSubmit={handleCancelDeleteSubmit}
          onDeleteSubmit={handleDeleteSubmit}
          disabled={isSubmitting}
        />
      </Modal>

      <SuccessModal
        isOpen={isModalSucessOpen}
        title={modalTitle}
        onClose={() => setIsModalSucessOpen(false)}
        message={modalMessage}
      />
    </>
  );
}

export default TransactionApp;
