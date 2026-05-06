"use client";

import Image from "next/image";

import { HeaderProps } from "@/types";

import { useIsMobile } from "@/hooks/useIsMobile";

import Menu from "@/components/Menu/Menu";

import style from "./Header.module.css";

export default function Header({
  title,
  onToggleFontSize,
  onToggleDarkMode,
}: HeaderProps) {
  const isMobile = useIsMobile();
  return (
    <header className={style.header}>
      {isMobile && <Menu/>}
      <h1 className={style.headerTitle}>{title}</h1>
      <div className={style.accessibility}>
        <button
          onClick={onToggleFontSize}
          className={style.buttonIcon}
          aria-label="Alterar tamanho da fonte"
        >
          <Image
            className={style.fontSizeImg}
            src="/alterarfonte.png"
            width={35}
            height={35}
            alt=""
          />
        </button>

        <button
          className={style.buttonIcon}
          onClick={onToggleDarkMode}
          aria-label="Alternar modo claro ou escuro"
        >
          <Image
            className={style.lightAndDarkImg}
            src="/modoclaroescuro.png"
            width={40}
            height={40}
            alt=""
          />
        </button>
      </div>
    </header>
  );
}
