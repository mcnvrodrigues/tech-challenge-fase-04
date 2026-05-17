import { useState } from "react";
import dynamic from "next/dynamic";
import { Transaction, TransactionType } from "@/types";
const BoxBalance = dynamic(
  () => import("./components/BoxBalance/BoxBalance"),
  {
    loading: () => <p>Carregando saldo...</p>,
    ssr: false,
  }
);
import NewTransaction from "./components/NewTransaction/NewTransaction";
import SuccessModal from "../SuccessModal/SuccessModal";
import TransactionHomeContainer from "./components/TransactionHomeContainer/TransactionHomeContainer";
import FinancialDashboard from "./components/FinancialDashboard/FinancialDashboard";
import { formatCurrency } from "@/utils/formatCurrency";
import style from "./HomeApp.module.css";

const MAX_FILE_SIZE = 2 * 1024 * 1024;

const convertFileToBase64 = (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = (error) => reject(error);
  });
};

function HomeApp({
  transactions,
  balance,
  dateString,
  transactionTypeOptions,
  onCreate,
  onUpdate,
  onDelete,
}: {
  transactions: Transaction[];
  balance: number;
  dateString: string;
  transactionTypeOptions: string[];
  onCreate: (t: Omit<Transaction, "id">) => void;
  onUpdate: (t: Transaction) => void;
  onDelete: (id: number) => void;
}) {
  const [type, setType] = useState<TransactionType | "">("");
  const [value, setValue] = useState("");
  const [description, setDescription] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [formKey, setFormKey] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [modalMessage, setModalMessage] = useState("");
  const [modalTitle, setModalTitle] = useState("Sucesso!");
  const [announcement, setAnnouncement] = useState("");

  const isHighBalance = balance > 5000;

  const suggestionText = isHighBalance
    ? "Sugestão: Seu saldo está alto! Clique para realizar uma transferência."
    : "Sugestão: Seu saldo está baixo. Clique para realizar um depósito.";

  const resetForm = () => {
    setType("");
    setValue("");
    setDescription("");
    setFile(null);
    setFormKey((prev) => prev + 1);
  };

  const handleClearFile = () => {
    setFile(null);
    setFormKey((prev) => prev + 1);
  };

  const handleApplySuggestion = () => {
    if (isHighBalance) {
      setType("transferencia");
      setDescription("Investimento de excedente");
    } else {
      setType("deposito");
      setDescription("Aporte de recursos");
    }

    setTimeout(() => setAnnouncement(""), 1000);
  };

  const handleFileSelect = (selectedFile: File | null) => {
    if (selectedFile && selectedFile.size > MAX_FILE_SIZE) {
      setModalTitle("Erro no Arquivo");
      setModalMessage("O arquivo é muito grande! O limite é de 2MB.");
      setIsOpenModal(true);
      setFile(null);
      setFormKey((prev) => prev + 1);
      return;
    }
    setFile(selectedFile);
  };

  const handleInvalidForm = () => {
    setIsOpenModal(true);
    setModalTitle("Erro!!!");
    setModalMessage("Por favor, preencha a transação!");

    setTimeout(() => resetForm(), 1500);
  };

  const handleInvalidTransfer = () => {
    setIsOpenModal(true);
    setModalTitle("Erro!!!");
    setModalMessage(
      "Saldo insuficiente para realizar a transferência!\nFaça um depósito!",
    );

    setTimeout(() => resetForm(), 1500);
  };

  const handleSubmit = async () => {
    if (!type || !value || Number(value) <= 0) {
      handleInvalidForm();
      return;
    }

    if (type == "transferencia" && Number(value) > balance) {
      handleInvalidTransfer();
      return;
    }

    setIsSubmitting(true);

    try {
      let fileBase64 = null;
      if (file) {
        fileBase64 = await convertFileToBase64(file);
      }

      onCreate({
        type: type as TransactionType,
        value: Number(value),
        description,
        date: new Date().toISOString().slice(0, 10),
        // @ts-expect-error - o tipo de Transaction não inclui "attachment" (anexo em base64) 
        attachment: fileBase64,
      });

      setModalTitle("Sucesso!!!");
      setModalMessage("Transação criada com sucesso!");
      setIsOpenModal(true);
    } catch (error) {
      console.error(error);
      setModalTitle("Erro");
      setModalMessage(
        "Erro ao salvar. Verifique se o anexo não excedeu o limite do navegador.",
      );
      setIsOpenModal(true);
    }

    setTimeout(() => {
      setIsOpenModal(false);
      setIsSubmitting(false);
      resetForm();
    }, 1500);
  };

  return (
    <>
      <div className={style.mainContent}>
        <BoxBalance balance={formatCurrency(balance)} dateString={dateString} />

        <div
          aria-live="polite"
          className="sr-only"
          style={{
            position: "absolute",
            width: "1px",
            height: "1px",
            padding: 0,
            margin: "-1px",
            overflow: "hidden",
            clip: "rect(0,0,0,0)",
            whiteSpace: "nowrap",
            border: 0,
          }}
        >
          {announcement}
        </div>

        <button
          className={
            isHighBalance
              ? style.suggestionBtnTransfer
              : style.suggestionBtnDeposit
          }
          onClick={handleApplySuggestion}
          type="button"
        >
          <span aria-hidden="true">💡 </span>
          {suggestionText}
        </button>

        <NewTransaction
          key={formKey}
          title="Nova transação"
          transactionTypeOptions={transactionTypeOptions}
          type={type}
          value={value}
          description={description}
          onTypeChange={setType}
          onValueChange={setValue}
          onDescriptionChange={setDescription}
          onFileChange={handleFileSelect}
          selectedFile={file}
          onClearFile={handleClearFile}
          onSubmit={handleSubmit}
          disabled={isSubmitting}
        />

        <FinancialDashboard transaction={transactions} />
      </div>

      <aside className={style.transactionsPanel}>
        <TransactionHomeContainer
          transactions={transactions}
          onCreate={onCreate}
          onUpdate={onUpdate}
          onDelete={onDelete}
        />
      </aside>

      <SuccessModal
        isOpen={isOpenModal}
        title={modalTitle}
        onClose={() => setIsOpenModal(false)}
        message={modalMessage}
      />
    </>
  );
}

export default HomeApp;
