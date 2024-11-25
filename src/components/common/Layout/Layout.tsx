import { ReactNode } from "react";
import Navbar from "../Navbar/Navbar";
import Footer from "../Footer/Footer";

interface LayoutProps {
  children: ReactNode;
  onSearch: (query: string) => void;
}

const Layout = ({ children, onSearch }: LayoutProps) => {
  return (
    <>
      <Navbar onSearch={onSearch} />
      <main>{children}</main>
      <Footer />
    </>
  );
};

export default Layout;
