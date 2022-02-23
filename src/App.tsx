import "bootstrap/dist/css/bootstrap.min.css";
import Container from "react-bootstrap/Container";
import NavBar from "./components/NavBar";
import HomePage from "./components/HomePage";
import AboutUs from "./components/AboutUs";
import Mining from "./components/Mining";
import Roadmap from "./components/Roadmap";
import "./styles/styles.css";

export default function App() {
  return (
    <Container className="background-gray">
      <NavBar />
      <HomePage />
      <AboutUs />
      <Mining />
      <Roadmap />
    </Container>
  );
}
