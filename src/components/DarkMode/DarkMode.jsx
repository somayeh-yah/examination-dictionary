import SunIcon from "../../assets/Sun.svg";
import MoonIcon from "../../assets/Moon.svg";
import "./DarkMode.css";

const DarkMode = ({ theme, setTheme }) => {
  const handleToggleChange = () => {
    setTheme(theme === "lite" ? "dark" : "lite");
  };

  return (
    <div className="dark_mode">
      <input 
      className="dark_mode_input" 
      type="checkbox" 
      id="darkmode-toggle"
      onChange={handleToggleChange}
      checked={theme === "dark"}
       />
      <label className="dark_mode_label" 
      htmlFor="darkmode-toggle">
        <img src={SunIcon} alt="Sun Icon" className="icon sun-icon" />
        <img src={MoonIcon} alt="Moon Icon" className="icon moon-icon" />
      </label>
    </div>
  );
};

export default DarkMode;
