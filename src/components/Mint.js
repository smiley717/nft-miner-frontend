import { useEffect, useState } from "react";
import { Row, Col, DropdownButton, Dropdown } from "react-bootstrap";
import toast from "react-hot-toast";
import { ethers } from "ethers";
import { useWeb3React } from "@web3-react/core";
import nftContractAbi from "../Abis/kor-nft-abi.json";
import aggregatorContractAbi from "../Abis/eac-aggregator-abi.json";
import { updateMetadata } from "../services/api";
require("dotenv").config();

export default function Mint() {
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

  const updatePrice = async () => {
    const _latestPrice = await AggregatorContract.latestAnswer();
    setLatestPrice(_latestPrice.toNumber());
  };

  const updateMiners = async () => {
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
  };

  useEffect(async () => {
    if (validNetwork && active) {
      await updateMiners();
      await updatePrice();
    }
  }, [validNetwork, active]);

  const handleMint = async (index, num) => {
    const price = (miners[index].price * latestPrice * num) / 4;

    await KorMintContract.buyMiner(index, num, {
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
    <Row
      className="align-items-center bubble-background fixed-menubar"
      id="mining"
    >
      <div className="about-text">
        <p className="text-center text-darkblue mb-0 fs-1 fw-bold">
          Mint a NFT, Get Kadena Miner
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
        <Row className="miner-rows">
          {parseInt(miners.length) === 0 ? (
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
                <Col key={index} className="d-flex justify-content-center">
                  <div className="miner-box">
                    <div className="d-flex justify-content-center">
                      <img
                        src={`images/miners/${miners[index].minerType}.png`}
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
                        <Dropdown.Item onClick={() => handleMint(index, 1)}>
                          Mint 1/4
                        </Dropdown.Item>
                        <Dropdown.Item onClick={() => handleMint(index, 2)}>
                          Mint 1/2
                        </Dropdown.Item>
                        <Dropdown.Item onClick={() => handleMint(index, 3)}>
                          Mint 3/4
                        </Dropdown.Item>
                        <Dropdown.Item onClick={() => handleMint(index, 4)}>
                          Mint 1
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
                </Col>
              );
            })
          )}
        </Row>
      )}
    </Row>
  );
}
