import { Row, Col, Button, DropdownButton, Dropdown } from "react-bootstrap";
import toast from "react-hot-toast";
import { ethers } from "ethers";
import ContractAbi from "../Abis/kor-nft-abi.json";
require("dotenv").config();

export default function Mint() {
  const handleMint = async () => {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const nftContract = new ethers.Contract(
      process.env.REACT_APP_NFT_ADDRESS,
      ContractAbi,
      provider.getSigner()
    );

    const price = 0.0025;
    const priceBigNum = ethers.utils.parseEther(price.toString());

    await nftContract
      .buyMiner(15, 1, {
        value: priceBigNum,
      })
      .then((tx) => {
        return tx.wait().then(
          (receipt) => {
            // This is entered if the transaction receipt indicates success
            console.log("receipt", receipt);
            toast.success("Your mint was Successful!");
            return true;
          },
          (error) => {
            console.log("error", error);
            toast.error("Your mint was Failed!");
          }
        );
      })
      .catch((error) => {
        toast.error("hello");
        if (error.message.indexOf("signature") > 0) {
          toast.error("You canceled transaction!");
        } else {
          toast.error(error);
        }
      });
  };

  return (
    <Row className="align-center gradient-background" id="mining">
      <div className="about-text">
        <p className="text-center text-darkblue mb-0 fs-1 fw-bold">
          Mint a NFT, Get Kadena Miner
        </p>
      </div>
      <Row className="miner-rows">
        <Col>
          <div className="d-flex justify-center">
            <img
              src="images/miners/15ths.jpg"
              className="img-fluid miner-img"
            />
          </div>
          <div className="d-flex justify-center mintBtn">
            <DropdownButton id="dropdown-basic-button" title="Mint" size="lg">
              <Dropdown.Item onClick={handleMint}>Mint 1/4</Dropdown.Item>
              <Dropdown.Item onClick={handleMint}>Mint 2/4</Dropdown.Item>
              <Dropdown.Item onClick={handleMint}>Mint 3/4</Dropdown.Item>
              <Dropdown.Item onClick={handleMint}>Mint 4/4</Dropdown.Item>
            </DropdownButton>
          </div>
        </Col>
        <Col>
          <div className="d-flex justify-center">
            <img
              src="images/miners/15ths.jpg"
              className="img-fluid miner-img"
            />
          </div>
          <div className="d-flex justify-center mintBtn">
            <DropdownButton id="dropdown-basic-button" title="Mint" size="lg">
              <Dropdown.Item onClick={handleMint}>Mint 1/4</Dropdown.Item>
              <Dropdown.Item onClick={handleMint}>Mint 2/4</Dropdown.Item>
              <Dropdown.Item onClick={handleMint}>Mint 3/4</Dropdown.Item>
              <Dropdown.Item onClick={handleMint}>Mint 4/4</Dropdown.Item>
            </DropdownButton>
          </div>
        </Col>
        <Col>
          <div className="d-flex justify-center">
            <img
              src="images/miners/15ths.jpg"
              className="img-fluid miner-img"
            />
          </div>
          <div className="d-flex justify-center mintBtn">
            <DropdownButton id="dropdown-basic-button" title="Mint" size="lg">
              <Dropdown.Item onClick={handleMint}>Mint 1/4</Dropdown.Item>
              <Dropdown.Item onClick={handleMint}>Mint 2/4</Dropdown.Item>
              <Dropdown.Item onClick={handleMint}>Mint 3/4</Dropdown.Item>
              <Dropdown.Item onClick={handleMint}>Mint 4/4</Dropdown.Item>
            </DropdownButton>
          </div>
        </Col>
        <Col>
          <div className="d-flex justify-center">
            <img
              src="images/miners/15ths.jpg"
              className="img-fluid miner-img"
            />
          </div>
          <div className="d-flex justify-center mintBtn">
            <DropdownButton id="dropdown-basic-button" title="Mint" size="lg">
              <Dropdown.Item onClick={handleMint}>Mint 1/4</Dropdown.Item>
              <Dropdown.Item onClick={handleMint}>Mint 2/4</Dropdown.Item>
              <Dropdown.Item onClick={handleMint}>Mint 3/4</Dropdown.Item>
              <Dropdown.Item onClick={handleMint}>Mint 4/4</Dropdown.Item>
            </DropdownButton>
          </div>
        </Col>
      </Row>
      <Row className="miner-rows">
        <Col>
          <div className="d-flex justify-center">
            <img
              src="images/miners/18ths.jpg"
              className="img-fluid miner-img"
            />
          </div>
          <div className="d-flex justify-center mintBtn">
            <DropdownButton id="dropdown-basic-button" title="Mint" size="lg">
              <Dropdown.Item onClick={handleMint}>Mint 1/4</Dropdown.Item>
              <Dropdown.Item onClick={handleMint}>Mint 2/4</Dropdown.Item>
              <Dropdown.Item onClick={handleMint}>Mint 3/4</Dropdown.Item>
              <Dropdown.Item onClick={handleMint}>Mint 4/4</Dropdown.Item>
            </DropdownButton>
          </div>
        </Col>
        <Col>
          <div className="d-flex justify-center">
            <img
              src="images/miners/18ths.jpg"
              className="img-fluid miner-img"
            />
          </div>
          <div className="d-flex justify-center mintBtn">
            <DropdownButton id="dropdown-basic-button" title="Mint" size="lg">
              <Dropdown.Item onClick={handleMint}>Mint 1/4</Dropdown.Item>
              <Dropdown.Item onClick={handleMint}>Mint 2/4</Dropdown.Item>
              <Dropdown.Item onClick={handleMint}>Mint 3/4</Dropdown.Item>
              <Dropdown.Item onClick={handleMint}>Mint 4/4</Dropdown.Item>
            </DropdownButton>
          </div>
        </Col>
        <Col>
          <div className="d-flex justify-center">
            <img
              src="images/miners/18ths.jpg"
              className="img-fluid miner-img"
            />
          </div>
          <div className="d-flex justify-center mintBtn">
            <DropdownButton id="dropdown-basic-button" title="Mint" size="lg">
              <Dropdown.Item onClick={handleMint}>Mint 1/4</Dropdown.Item>
              <Dropdown.Item onClick={handleMint}>Mint 2/4</Dropdown.Item>
              <Dropdown.Item onClick={handleMint}>Mint 3/4</Dropdown.Item>
              <Dropdown.Item onClick={handleMint}>Mint 4/4</Dropdown.Item>
            </DropdownButton>
          </div>
        </Col>
        <Col>
          <div className="d-flex justify-center">
            <img
              src="images/miners/18ths.jpg"
              className="img-fluid miner-img"
            />
          </div>
          <div className="d-flex justify-center mintBtn">
            <DropdownButton id="dropdown-basic-button" title="Mint" size="lg">
              <Dropdown.Item onClick={handleMint}>Mint 1/4</Dropdown.Item>
              <Dropdown.Item onClick={handleMint}>Mint 2/4</Dropdown.Item>
              <Dropdown.Item onClick={handleMint}>Mint 3/4</Dropdown.Item>
              <Dropdown.Item onClick={handleMint}>Mint 4/4</Dropdown.Item>
            </DropdownButton>
          </div>
        </Col>
      </Row>
    </Row>
  );
}
