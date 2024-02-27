import { Inter } from "next/font/google";
import "./globals.css";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import AuthProvider from "@/context/AuthProvider";
import Auth from "@/context/Auth";
const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Home - Blue Pie Meta",
  description: "Blue Pie Meta Official Website",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <AuthProvider>
          <ToastContainer
            position="top-right"
            autoClose={2000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
          />
          {children}
        </AuthProvider>
      </body>
    </html>
  );
}
