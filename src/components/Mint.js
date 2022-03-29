import { useEffect, useState } from "react";
import {
  Row,
  Col,
  DropdownButton,
  Dropdown,
  Modal,
  Button,
} from "react-bootstrap";
import toast from "react-hot-toast";
import { ethers } from "ethers";
import { useWeb3React } from "@web3-react/core";
import nftContractAbi from "../Abis/kor-nft-abi.json";
import aggregatorContractAbi from "../Abis/eac-aggregator-abi.json";
import { updateMetadata } from "../services/api";
require("dotenv").config();

export default function Mint() {
  const [isLoading, setIsLoading] = useState(true);
  const [showMintModal, setShowMintModal] = useState(false);
  const [mintAmountValue, setMintAmountValue] = useState(0);
  const [selectedMinerIndex, setSelectedMinerIndex] = useState(0);

  const [latestPrice, setLatestPrice] = useState(0);
  const [miners, setMiners] = useState([]);

  const { chainId, active } = useWeb3React();
  const validNetwork =
    chainId === parseInt(process.env.REACT_APP_CHAIN_ID) ? true : false;

  const provider = new ethers.providers.Web3Provider(window.ethereum);
  const KorMintContract = new ethers.Contract(
    process.env.REACT_APP_NFT_ADDRESS,
    nftContractAbi,
    provider.getSigner()
  );

  const AggregatorContract = new ethers.Contract(
    process.env.REACT_APP_EACAggregator_ADDRESS,
    aggregatorContractAbi,
    provider.getSigner()
  );

  const handleCloseMintModal = () => setShowMintModal(false);
  const handleShowMintModal = () => setShowMintModal(true);

  const handleAmountChange = (event) => {
    setMintAmountValue(event.target.value);
  };

  const handleMintMore = (index) => {
    handleShowMintModal();
    setSelectedMinerIndex(index);
  };

  const updatePrice = async () => {
    const _latestPrice = await AggregatorContract.latestAnswer();
    setLatestPrice(_latestPrice.toNumber());
  };

  const updateMiners = async () => {
    setIsLoading(true);
    const _totalMiner = await KorMintContract.totalMiner();

    let newArr = [];
    for (let i = 0; i < _totalMiner; i++) {
      const miner = await KorMintContract.miners(i);
      const minted = await KorMintContract.mintedMinerCount(i);
      const total = miner.numOfMiner.toNumber() / 4;
      const available = total - minted.toNumber() / 4;

      newArr.push({
        minerType: miner.minerType,
        hashrate: miner.hashrate.toNumber(),
        total: total,
        available: available,
        price: miner.price.toString(),
      });
    }
    setMiners(newArr);
    setIsLoading(false);
  };

  useEffect(() => {
    if (validNetwork && active) {
      updateMiners();
      updatePrice();
    }
  }, [validNetwork, active]);

  const handleMint = async (index, num) => {
    const price = (miners[index].price * latestPrice * parseFloat(num) * 4) / 4;

    await KorMintContract.buyMiner(index, parseFloat(num) * 4, {
      value: price.toString(),
    })
      .then((tx) => {
        return tx.wait().then(
          async (receipt) => {
            // This is entered if the transaction receipt indicates success
            toast.success("Your mint was Successful!");
            await updateMiners();
            await updateMetadata();
            return true;
          },
          (error) => {
            toast.error("Your mint was Failed!");
          }
        );
      })
      .catch((error) => {
        toast.error("Your mint was Failed!");
        if (error.message.indexOf("signature") > 0) {
          toast.error("You canceled transaction!");
        } else {
          toast.error(error);
        }
      });
  };

  return (
    <Row className="align-items-center bubble-background fixed-menubar">
      <div className="about-text">
        <p className="text-center text-darkblue mb-0 fs-1 fw-bold">
          Buy Miner, Receive NFT, Earn Profit
        </p>
      </div>
      {!active ? (
        <Row>
          <div className="text-center fs-2 fw-bold text-body mt-5 mb-5">
            Please connect your wallet
          </div>
        </Row>
      ) : !validNetwork ? (
        <Row>
          <div className="text-center fs-2 fw-bold text-body mt-5 mb-5">
            Please switch your network into Ethereum main network
          </div>
        </Row>
      ) : (
        <Row className="miner-rows m-auto">
          {isLoading ? (
            <Row>
              <div className="text-center fs-2 fw-bold text-body mt-5 mb-5">
                Loading...
              </div>
            </Row>
          ) : parseInt(miners.length) === 0 ? (
            <Row>
              <div className="text-center fs-2 fw-bold text-body mt-5 mb-5">
                No miners available for now
              </div>
            </Row>
          ) : (
            Array.from(
              { length: parseInt(miners.length) },
              (_, i) => 0 + i
            ).map((index) => {
              return (
                <Col
                  key={index}
                  className="d-flex justify-content-center miner-margin"
                >
                  <div className="miner-box">
                    <div className="d-flex justify-content-center">
                      <img
                        src={`images/miners_website/${miners[index].minerType}.png`}
                        alt="miner"
                        className="img-fluid miner-img"
                      />
                    </div>
                    <div className="d-flex justify-content-center text-light mt-3 mb-0 fs-5">
                      <span className="font-1">Hashrate: </span>&nbsp; &nbsp;
                      <span className="font-2">
                        {miners[index].hashrate} Th/s
                      </span>
                    </div>
                    <div className="d-flex justify-content-center text-light mt-3 mb-0 fs-5">
                      <span className="font-1">Price: </span>&nbsp; &nbsp;
                      <span className="font-2">{miners[index].price} USD</span>
                    </div>
                    <div className="d-flex justify-content-center text-light mb-0 fs-5">
                      <span className="font-1">Total: </span>&nbsp; &nbsp;
                      <span className="font-2">{miners[index].total}</span>
                    </div>
                    <div className="d-flex justify-content-center text-light mb-0 fs-5">
                      <span className="font-1">Available: </span>&nbsp; &nbsp;
                      <span className="font-2">{miners[index].available}</span>
                    </div>
                    <div className="d-flex justify-content-center mintBtn">
                      <DropdownButton
                        id="dropdown-basic-button"
                        title="Mint"
                        size="lg"
                      >
                        <Dropdown.Item onClick={() => handleMint(index, 0.25)}>
                          Mint 1/4
                        </Dropdown.Item>
                        <Dropdown.Item onClick={() => handleMint(index, 0.5)}>
                          Mint 1/2
                        </Dropdown.Item>
                        <Dropdown.Item onClick={() => handleMint(index, 0.75)}>
                          Mint 3/4
                        </Dropdown.Item>
                        <Dropdown.Item onClick={() => handleMint(index, 1)}>
                          Mint 1
                        </Dropdown.Item>
                        <Dropdown.Item onClick={() => handleMintMore(index)}>
                          Mint More
                        </Dropdown.Item>
                      </DropdownButton>
                    </div>
                    <div className="d-flex justify-content-center text-danger mt-3 mb-3 fs-6">
                      * Current USD / ETH price:
                    </div>
                    <div className="d-flex justify-content-center text-light mb-0 fs-6">
                      {(10 ** 18 / latestPrice).toString().substring(0, 8)}
                    </div>
                  </div>
                  <Modal show={showMintModal} onHide={handleCloseMintModal}>
                    <Modal.Header closeButton>
                      <Modal.Title>
                        Mint miner {miners[selectedMinerIndex].minerType} with{" "}
                        {miners[selectedMinerIndex].hashrate} Th/s
                      </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                      <div className="m-auto mb-2 d-flex align-items-center">
                        <span className="text-body fs-6 me-3">
                          * Mint Amount:
                        </span>
                        <span className="text-danger fs-3">
                          {mintAmountValue}
                        </span>
                      </div>
                      <input
                        id="range"
                        type="range"
                        value={mintAmountValue}
                        min="0"
                        max={miners[selectedMinerIndex].available}
                        step="0.25"
                        className="w-100"
                        onChange={handleAmountChange}
                      />
                    </Modal.Body>
                    <Modal.Footer>
                      <Button
                        variant="secondary"
                        onClick={handleCloseMintModal}
                      >
                        Close
                      </Button>
                      <Button
                        variant="primary"
                        onClick={() =>
                          handleMint(selectedMinerIndex, mintAmountValue)
                        }
                        disabled={parseFloat(mintAmountValue) === 0}
                      >
                        Mint
                      </Button>
                    </Modal.Footer>
                  </Modal>
                </Col>
              );
            })
          )}
        </Row>
      )}
    </Row>
  );
}
