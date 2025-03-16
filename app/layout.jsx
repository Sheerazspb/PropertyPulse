import AuthProvider from "@/components/AuthProvider";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../assets/styles/global.css";
import { MessageProvider } from "@/context/MessageContext";
import "photoswipe/dist/photoswipe.css";

export const metadata = {
  title: "Property Pulse",
  description: "Find the perfect property",
  keywords: "rental, property, real estate",
};

const MainLayout = ({ children }) => {
  return (
    <AuthProvider>
      <MessageProvider>
        <html>
          <body>
            <ToastContainer />
            <Navbar />
            <main>{children}</main>
            <Footer />
          </body>
        </html>
      </MessageProvider>
    </AuthProvider>
  );
};

export default MainLayout;
