import Navbar from "../Nav/Nav";

function Header({ onSearch }) {
  return (
    <header>
      <Navbar onSearch={onSearch} />
    </header>
  );
}

export default Header;
