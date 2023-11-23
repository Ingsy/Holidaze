import Header from "./Header/Header";
import Footer from "./Footer/Footer";
import { Outlet } from "react-router-dom";

function Layout({ onSearch }) {
  return (
    <div>
      <Header onSearch={onSearch} />
      <main className="d-flex justify-content-center">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}

export default Layout;
