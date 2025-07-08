import "./globals.css";
import type { Metadata } from "next";
import TanStackProvider from "../components/TanStackProvider/TanStackProvider";
import Header from "../components/Header/Header";
import Footer from "../components/Footer/Footer";
import type { ReactNode } from "react";

export const metadata: Metadata = {
  title: "NoteHub",
  description: "Application for creating and viewing notes",
  icons: {
    icon: "/notehub.svg",
  },
};

interface RootLayoutProps {
  children: ReactNode;
  modal: ReactNode;
}

export default function RootLayout({ children, modal }: RootLayoutProps) {
  return (
    <html lang="en">
      <body>
        <TanStackProvider>
          <Header />
          <main style={{ flex: 1 }}>{children}</main>
          {modal}
          <Footer />
        </TanStackProvider>
      </body>
    </html>
  );
}