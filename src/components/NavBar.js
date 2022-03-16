import { BsFillArrowLeftCircleFill } from "react-icons/bs";
import { useEffect } from "react";
import { Row, Navbar, Nav, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useWeb3React } from "@web3-react/core";
import toast, { Toaster } from "react-hot-toast";
import { injected } from "../utils/connector";
require("dotenv").config();

export default function NavBar(props) {
  console.log("====", props);
  const showBack = props.showBack;
  const { chainId, active, activate, deactivate, account } = useWeb3React();
  const navigate = useNavigate();

  useEffect(() => {
    if (active) {
      if (chainId !== parseInt(process.env.REACT_APP_CHAIN_ID)) {
        toast.error(
          "You are on wrong network. Please switch to Ethereum Mainnet to continue"
        );
      }
    }
  }, [chainId, active]);

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
          <div className="walletAddress">
            {account.substring(0, 5) + " ... " + account.substring(38)}
          </div>
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
        <>
          {showBack ? (
            <div className="d-flex ms-5">
              <Nav className="me-5">
                <Nav.Link onClick={() => goBack()}>
                  <BsFillArrowLeftCircleFill />
                  &nbsp;Back
                </Nav.Link>
              </Nav>
              <div className="btn-connect">{renderButton}</div>
            </div>
          ) : (
            <div className="d-flex m-auto">
              <Navbar.Brand href="#home" className="d-flex align-items-center">
                <img
                  src="images/logo.jpg"
                  className="img-fluid logo"
                  alt="logo"
                />
              </Navbar.Brand>
              <Navbar.Toggle aria-controls="basic-navbar-nav" />
              <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="me-5">
                  <Nav.Link href="#home">HOME</Nav.Link>
                  <Nav.Link href="#about-us">ABOUT US</Nav.Link>
                  <Nav.Link href="#mining">MINING</Nav.Link>
                  <Nav.Link href="#roadmap">ROADMAP</Nav.Link>
                </Nav>
                <div className="d-flex align-items-center">
                  <div className="d-flex me-5">
                    <a href="#">
                      <img
                        src="images/instagram.png"
                        className="img-fluid p-4 height-100"
                      />
                    </a>
                    <a href="#">
                      <img
                        src="images/opensea.png"
                        className="img-fluid p-4 height-100"
                      />
                    </a>
                    <a href="#">
                      <img
                        src="images/discord.png"
                        className="img-fluid p-4 height-100"
                      />
                    </a>
                  </div>
                  <div className="btn-connect">{renderButton}</div>
                </div>
              </Navbar.Collapse>
            </div>
          )}
        </>
        <Toaster
          position="top-right"
          toastOptions={{
            success: {
              style: {
                background: "white",
                paddingLeft: 40,
                paddingRight: 40,
                fontWeight: 500,
              },
            },
            error: {
              style: {
                background: "white",
                color: "black",
                paddingLeft: 40,
                paddingRight: 40,
                fontWeight: 500,
              },
            },
          }}
        />
      </Navbar>
    </Row>
  );
}
