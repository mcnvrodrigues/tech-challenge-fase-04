"use client";

import Header from "./components/Header/Header";

interface Props {
  onToggleDarkMode: () => void;
  onToggleFontSize: () => void;
}

function HeaderContainer({ onToggleDarkMode, onToggleFontSize }: Props) {

  return (
    <Header
      title="Banco FIAP"
      onToggleDarkMode={onToggleDarkMode}
      onToggleFontSize={onToggleFontSize}
    />
  );
}

export default HeaderContainer;
