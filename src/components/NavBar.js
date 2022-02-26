import { useEffect, useState } from "react";
import { Row, Navbar, Container, Nav, Button } from "react-bootstrap";
import { useWeb3React } from "@web3-react/core";
import toast, { Toaster } from "react-hot-toast";
import { injected } from "../utils/connector";
require("dotenv").config();

export default function NavBar() {
  const { chainId, active, activate, deactivate, account } = useWeb3React();
  const [isWrongNetwork, setIsWrongNetwork] = useState();

  useEffect(() => {
    if (active) {
      if (chainId !== parseInt(process.env.REACT_APP_CHAIN_ID)) {
        toast.error(
          "You are on wrong network. Please switch to Ethereum Mainnet to continue"
        );
        setIsWrongNetwork(true);
      } else {
        setIsWrongNetwork(false);
      }
    }
  }, [chainId]);

  async function connect(injected) {
    activate(injected);
  }

  async function disConnect(injected) {
    deactivate(injected);
  }

  const renderButton = (
    <>
      {active ? (
        <div className="connectedWallet">
          <div className="walletAddress">{account}</div>
          <Button
            variant="primary"
            size="lg"
            onClick={() => disConnect(injected)}
          >
            Disconnect
          </Button>
        </div>
      ) : (
        <Button variant="primary" size="lg" onClick={() => connect(injected)}>
          Connect Wallet
        </Button>
      )}
    </>
  );

  return (
    <Row className="menubar">
      <Navbar bg="dark" variant="dark">
        <Container>
          <Nav className="me-auto">
            <Nav.Link href="#home">HOME</Nav.Link>
            <Nav.Link href="#about-us">ABOUT US</Nav.Link>
            <Nav.Link href="#mining">MINING</Nav.Link>
            <Nav.Link href="#roadmap">ROADMAP</Nav.Link>
          </Nav>
          <div className="btn-connect">{renderButton}</div>
        </Container>
      </Navbar>
    </Row>
  );
}
