import "./globals.css";
import type { Metadata } from "next";
import TanStackProvider from "../components/TanStackProvider/TanStackProvider";
import Header from "../components/Header/Header";
import Footer from "../components/Footer/Footer";


export const metadata: Metadata = {
  title: "NoteHub",
  description: "Application for creating and viewing notes",
  icons: {
    icon: "/notehub.svg",
  },
};

export default function RootLayout({
  children,
  modal,
}: Readonly<{
  children: React.ReactNode;
  modal: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <TanStackProvider>
          <Header />
          <main style={{ flex: 1 }}>{children}</main>
          {modal} {/* Вставляємо модальне вікно */}
          <Footer />
        </TanStackProvider>
      </body>
    </html>
  );
}