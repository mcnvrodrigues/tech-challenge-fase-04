import "@/styles/globals.css";
import type { AppProps } from "next/app";
import dynamic from 'next/dynamic';
import store from '../store';


import { AccessibilityProvider, useAccessibility } from "@/contexts/AccessibilityProvider";
import { Provider } from "react-redux";

interface HeaderContainerProps {
  onToggleDarkMode: () => void;
  onToggleFontSize: () => void;
}

const HeaderContainer = dynamic<HeaderContainerProps>(
  () => import('remoteApp/HeaderContainer') as Promise<{
    default: React.ComponentType<HeaderContainerProps>;
  }>,
  { ssr: false }
)

function HeaderWrapper() {
  const { toggleDarkMode, toggleChangeFontSize } = useAccessibility();

  return (
    <HeaderContainer
      onToggleDarkMode={toggleDarkMode}
      onToggleFontSize={toggleChangeFontSize}
    />
  );
}

export default function App({ Component, pageProps }: AppProps) {
  return (
    <AccessibilityProvider>
      <Provider store={store}>
        <HeaderWrapper />
        <Component {...pageProps} />
      </Provider>
    </AccessibilityProvider>
  );
}
