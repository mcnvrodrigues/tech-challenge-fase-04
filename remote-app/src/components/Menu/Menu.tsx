"use client";

import { useState } from "react";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { useIsMobile } from "@/hooks/useIsMobile";

import { MenuItem } from "@/types";

import style from "./Menu.module.css";

const menuItems: MenuItem[] = [
  { label: "Início", path: "/" },
  { label: "Transações", path: "/transacoes" },
];

export default function Menu() {
  const [open, setOpen] = useState(false);
  const isMobile = useIsMobile();
  const pathname = usePathname();

  const closeMenu = () => setOpen(false);

  const renderLinks = () => (
    <div className={`${style.mobileMenuWrapper} ${open ? style.open : ""}`}>
      {isMobile && (
        <button
          className={style.btnClose}
          onClick={closeMenu}
          aria-label="Fechar menu"
        >
          ✖
        </button>
      )}

      <ul className={style.menuLinks}>
        {menuItems.map((item) => {
          const isActive = pathname === item.path;
          return (
            <li
              key={item.path}
              className={`${style.menuItem} ${isActive ? style.activeItem : ""}`}
              onClick={closeMenu}
            >
              <Link href={item.path} aria-current={isActive ? "page" : undefined} >
                {item.label}
              </Link>
            </li>
          );
        })}
      </ul>
    </div>
  );

  return (
    <nav className={style.Menu} aria-label="Menu principal">
      {isMobile && open && (
        <div className={style.overlay} onClick={closeMenu}></div>
      )}

      {isMobile ? (
        <>
          {renderLinks()}

          <button
            className={style.btnToggle}
            onClick={() => setOpen((prev) => !prev)}
            aria-label={open ? "Fechar menu" : "Abrir menu"}
            aria-expanded={open}
            aria-controls="menu-mobile"
          >
            ☰
          </button>
        </>
      ) : (
        renderLinks()
      )}
    </nav>
  );
}
