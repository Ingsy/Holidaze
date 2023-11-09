import Header from "./Header";
import Footer from "./Footer";
import { Outlet } from "react-router-dom";

function Layout({ onSearch }) {
  return (
    <div>
      <Header />
      <main className="d-flex justify-content-center">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}

export default Layout;
