import { useEffect, useState } from "react";
import { Row, Col, Button, DropdownButton, Dropdown } from "react-bootstrap";
import toast from "react-hot-toast";
import { ethers } from "ethers";
import ContractAbi from "../Abis/kor-nft-abi.json";
require("dotenv").config();

export default function Mint() {
  const [totalMinerTypes, setTotalMinerTypes] = useState(0);
  const [miners, setMiners] = useState([]);

  const provider = new ethers.providers.Web3Provider(window.ethereum);
  const KorMintContract = new ethers.Contract(
    process.env.REACT_APP_NFT_ADDRESS,
    ContractAbi,
    provider.getSigner()
  );

  useEffect(async () => {
    const _totalMinerTypes = await KorMintContract.totalMinerTypes();
    setTotalMinerTypes(_totalMinerTypes.toNumber());
    console.log(_totalMinerTypes.toNumber());

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
  }, []);

  const handleMint = async (index, num) => {
    const hashrate = miners[index].hashrate;
    const price = (miners[index].price / 4) * num;
    const priceBigNum = ethers.utils.parseEther(price.toString());

    await KorMintContract.buyMiner(hashrate, num, {
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
        {Array.from({ length: parseInt(miners.length) }, (_, i) => 0 + i).map(
          (index) => {
            return (
              <Col key={index}>
                <div className="d-flex justify-center">
                  <img
                    src={`images/miners/${miners[index].hashrate}ths.jpg`}
                    className="img-fluid miner-img"
                  />
                </div>
                <div className="d-flex justify-center text-light mt-3 mb-0 fs-5">
                  Price: {miners[index].price} ETH
                </div>
                <div className="d-flex justify-center text-light mb-0 fs-5">
                  Total: {miners[index].total}
                </div>
                <div className="d-flex justify-center text-light mb-0 fs-5">
                  Available: {miners[index].available}
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
              </Col>
            );
          }
        )}
      </Row>
    </Row>
  );
}
