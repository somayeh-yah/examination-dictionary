import "../components/Loading.css";
import spinner from "../assets/spinner.png";
export default function Loading() {
  return (
    <section className="loading-container">
      <div className="spinner-icon">
        <img src={spinner} alt="spinner icon" />
      </div>
    </section>
  );
}
