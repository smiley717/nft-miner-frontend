import { BsFillArrowLeftCircleFill } from "react-icons/bs";
import { useEffect, useState } from "react";
import { Row, Navbar, Container, Nav, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useWeb3React } from "@web3-react/core";
import toast, { Toaster } from "react-hot-toast";
import { injected } from "../utils/connector";
require("dotenv").config();

export default function NavBar(props) {
  console.log("====", props);
  const showBack = props.showBack;
  const { chainId, active, activate, deactivate, account } = useWeb3React();
  const [isWrongNetwork, setIsWrongNetwork] = useState();
  const navigate = useNavigate();

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

  const goBack = () => {
    navigate(-1);
  };

  return (
    <Row className="menubar">
      <Navbar bg="light" className="navbar-background">
        {showBack ? (
          <Container>
            <Nav className="me-auto">
              <Nav.Link onClick={() => goBack()}>
                <BsFillArrowLeftCircleFill />
                &nbsp;Back
              </Nav.Link>
            </Nav>
            <div className="btn-connect">{renderButton}</div>
          </Container>
        ) : (
          <Container>
            <Navbar.Brand href="#home">
              <img src="images/logo.jpg" className="img-fluid logo" />
            </Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
              <Nav className="me-auto">
                <Nav.Link href="#home">HOME</Nav.Link>
                <Nav.Link href="#about-us">ABOUT US</Nav.Link>
                <Nav.Link href="#mining">MINING</Nav.Link>
                <Nav.Link href="#roadmap">ROADMAP</Nav.Link>
              </Nav>
              <div className="btn-connect">{renderButton}</div>
            </Navbar.Collapse>
          </Container>
        )}
      </Navbar>
    </Row>
  );
}
