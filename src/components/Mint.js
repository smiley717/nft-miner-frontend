import { useEffect, useState } from "react";
import { Row, Col, Button, DropdownButton, Dropdown } from "react-bootstrap";
import toast from "react-hot-toast";
import { ethers } from "ethers";
import { useWeb3React } from "@web3-react/core";
import ContractAbi from "../Abis/kor-nft-abi.json";
require("dotenv").config();

export default function Mint() {
  const [totalMinerTypes, setTotalMinerTypes] = useState(0);
  const [miners, setMiners] = useState([]);

  const { chainId, active } = useWeb3React();
  const validNetwork =
    chainId === parseInt(process.env.REACT_APP_CHAIN_ID) ? true : false;

  const provider = new ethers.providers.Web3Provider(window.ethereum);
  const KorMintContract = new ethers.Contract(
    process.env.REACT_APP_NFT_ADDRESS,
    ContractAbi,
    provider.getSigner()
  );

  const updateMiners = async () => {
    const _totalMinerTypes = await KorMintContract.totalMinerTypes();
    setTotalMinerTypes(_totalMinerTypes.toNumber());

    let newArr = [];
    for (let i = 0; i < _totalMinerTypes; i++) {
      const miner = await KorMintContract.miners(i);
      const minted = await KorMintContract.mintedMinerCount(
        miner.hashrate.toNumber()
      );
      const total = miner.numOfMiner.toNumber() / 4;
      const available = total - minted.toNumber() / 4;

      newArr.push({
        hashrate: miner.hashrate.toNumber(),
        total: total,
        available: available,
        price: (miner.price / 10 ** 18).toString(),
      });
    }
    setMiners(newArr);
  };

  useEffect(async () => {
    if (validNetwork && active) {
      updateMiners();
    }
  }, [validNetwork, active]);

  const handleMint = async (index, num) => {
    const hashrate = miners[index].hashrate;
    let price = (miners[index].price * num) / 4;
    if (num === 3) price += 0.0001;
    const priceBigNum = ethers.utils.parseEther(price.toString());

    await KorMintContract.buyMiner(hashrate, num, {
      value: priceBigNum,
    })
      .then((tx) => {
        return tx.wait().then(
          (receipt) => {
            // This is entered if the transaction receipt indicates success
            toast.success("Your mint was Successful!");
            updateMiners();
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
    <Row className="align-center bubble-background" id="mining">
      <div className="about-text">
        <p className="text-center text-darkblue mb-0 fs-1 fw-bold">
          Mint a NFT, Get Kadena Miner
        </p>
      </div>
      {!active ? (
        <Row>
          <div className="text-center fs-2 fw-bold text-body mt-5">
            Please connect your wallet
          </div>
        </Row>
      ) : !validNetwork ? (
        <Row>
          <div className="text-center fs-2 fw-bold text-body mt-5">
            Please switch your network into Ethereum main network
          </div>
        </Row>
      ) : (
        <Row className="miner-rows">
          {parseInt(miners.length) === 0 ? (
            <Row>
              <div className="text-center fs-2 fw-bold text-body mt-5">
                No miners available for now
              </div>
            </Row>
          ) : (
            Array.from(
              { length: parseInt(miners.length) },
              (_, i) => 0 + i
            ).map((index) => {
              return (
                <Col key={index} className="d-flex justify-center">
                  <div className="miner-box">
                    <div className="d-flex justify-center">
                      <img
                        src={`images/miners/KD5.png`}
                        className="img-fluid miner-img"
                      />
                    </div>
                    <div className="d-flex justify-center text-light mt-3 mb-0 fs-5">
                      <span className="font-1">Hashrate: </span>&nbsp; &nbsp;
                      <span className="font-2">
                        {miners[index].hashrate} Th/s
                      </span>
                    </div>
                    <div className="d-flex justify-center text-light mt-3 mb-0 fs-5">
                      <span className="font-1">Price: </span>&nbsp; &nbsp;
                      <span className="font-2">{miners[index].price} ETH</span>
                    </div>
                    <div className="d-flex justify-center text-light mb-0 fs-5">
                      <span className="font-1">Total: </span>&nbsp; &nbsp;
                      <span className="font-2">{miners[index].total}</span>
                    </div>
                    <div className="d-flex justify-center text-light mb-0 fs-5">
                      <span className="font-1">Available: </span>&nbsp; &nbsp;
                      <span className="font-2">{miners[index].available}</span>
                    </div>
                    <div className="d-flex justify-center mintBtn">
                      <DropdownButton
                        id="dropdown-basic-button"
                        title="Mint"
                        size="lg"
                      >
                        <Dropdown.Item onClick={() => handleMint(index, 1)}>
                          Mint 1/4
                        </Dropdown.Item>
                        <Dropdown.Item onClick={() => handleMint(index, 2)}>
                          Mint 2/4
                        </Dropdown.Item>
                        <Dropdown.Item onClick={() => handleMint(index, 3)}>
                          Mint 3/4
                        </Dropdown.Item>
                        <Dropdown.Item onClick={() => handleMint(index, 4)}>
                          Mint 4/4
                        </Dropdown.Item>
                      </DropdownButton>
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
