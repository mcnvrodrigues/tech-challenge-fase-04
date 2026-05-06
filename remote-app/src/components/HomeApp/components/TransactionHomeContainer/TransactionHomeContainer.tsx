import { useState } from "react";

import { Transaction, TransactionType } from "@/types";

import SuccessModal from "../../../SuccessModal/SuccessModal";
import Modal from "../Modal/Modal";
import NewTransaction from "../NewTransaction/NewTransaction";
import TransactionsListHome from "../TransactionsListHome/TransactionsListHome";

import { sortTransactionsByDate } from "@/utils/transactions";

export type TransactionHomeContainer = {
  transactions: Transaction[];
  onCreate(transaction: Omit<Transaction, "id">): void;
  onUpdate(transaction: Transaction): void;
  onDelete(id: number): void;
};

function TransactionHomeContainer({
  transactions,
  onCreate,
  onUpdate,
  onDelete,
}: {
  transactions: Transaction[];
  onCreate: (t: Omit<Transaction, "id">) => void;
  onUpdate: (t: Transaction) => void;
  onDelete: (id: number) => void;
}) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [selectedTransaction, setSelectedTransaction] =
    useState<Transaction | null>(null);
  const [editType, setEditType] = useState<TransactionType>("deposito");
  const [editValue, setEditValue] = useState("");
  const [editDescription, setEditDescription] = useState("");
  const [isModalSucessOpen, setIsModalSucessOpen] = useState(false);
  const [modalMessage, setModalMessage] = useState("");
  const [modalTitle, setModalTitle] = useState("Sucesso!");

  const handleEdited = () => {
    setIsModalSucessOpen(true);
    setModalTitle("Sucesso!!!");
    setModalMessage("Transação editada com sucesso!");
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedTransaction(null);
    setEditValue("");
    setEditDescription("");
  };

  const handleEditSubmit = () => {
    if (!selectedTransaction) return;

    setIsSubmitting(true);
    try {
      const numericValue = Number(editValue.replace(",", "."));

      const updatedTransaction: Transaction = {
        ...selectedTransaction, // mantém id e date
        type: editType,
        value: numericValue,
        description: editDescription,
      };

      // 🔥 dispara para o HOST
      onUpdate(updatedTransaction);

      handleCloseModal();
      handleEdited(); // feedback visual
    } catch (err) {
      console.error("Erro ao editar transação:", err);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <TransactionsListHome
        title="Últimas transações"
        transaction={sortTransactionsByDate(transactions).slice(0, 3)}
      />

      {/* <Modal isOpen={isModalOpen} onClose={handleCloseModal}>
        <NewTransaction
          title="Editar Transação"
          type={editType}
          value={editValue}
          description={editDescription}
          onTypeChange={setEditType}
          onValueChange={setEditValue}
          onDescriptionChange={setEditDescription}
          onSubmit={handleEditSubmit}
          disabled={isSubmitting}
        />
      </Modal>

      <SuccessModal
        isOpen={isModalSucessOpen}
        title={modalTitle}
        onClose={() => setIsModalSucessOpen(false)}
        message={modalMessage}
      /> */}
    </>
  );
}

export default TransactionHomeContainer;
