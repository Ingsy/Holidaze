import Navbar from "../Nav";

function Header({ onSearch }) {
  return (
    <header>
      <Navbar onSearch={onSearch} />
    </header>
  );
}

export default Header;
