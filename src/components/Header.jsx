import "../components/Header.css";
import Logo from "../assets/logo.svg";

function Header({theme}) {
  return (
    <header className="header">
      <img className="header__logo" src={Logo} alt="Logo" />
      
        <h1>World Wide Library</h1>
      
    </header>
  );
}

export default Header;
