import { Web3ReactProvider } from "@web3-react/core";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Web3 from "web3";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

import Container from "react-bootstrap/Container";
import NavBar from "./components/NavBar";
import HomePage from "./components/HomePage";
import AboutUs from "./components/AboutUs";
import Mining from "./components/Mining";
import Roadmap from "./components/Roadmap";
import Mint from "./components/Mint";

function getLibrary(provider) {
  return new Web3(provider);
}

function App() {
  return (
    <Web3ReactProvider getLibrary={getLibrary}>
      <Router>
        <Routes>
          <Route
            path="/"
            element={
              <Container className="background-gray">
                <NavBar />
                <HomePage />
                <AboutUs />
                <Mining />
                <Roadmap />
              </Container>
            }
          />
          <Route
            path="/mint"
            element={
              <Container className="background-gray">
                <NavBar />
                <Mint />
              </Container>
            }
          />
        </Routes>
      </Router>
    </Web3ReactProvider>
  );
}

export default App;