import { Row, Button } from "react-bootstrap";
import { Link } from "react-router-dom";

export default function Mining() {
  return (
    <Row className="align-items-center bubble-background" id="mining">
      <div className="about-text">
        <p className="text-start text-secondary text-wrap mb-0 fs-4">
          <span className="fs-3 fw-bold text-secondary">
            Benefits of mining:{" "}
          </span>
          Crypto miners are the perfect investment for people who don't have the
          time to make technical decisions about when to buy and sell their
          crypto. Mining has shown to be a safer alternative due to profits
          being made everyday, causing a guaranteed ROI to be reached in the
          future. Think of crypto mining as strong linear growth rather than
          dealing with the volatile movement of the current crypto markets.
        </p>
        <br></br>
        <p className="text-start text-secondary text-wrap mb-0 fs-4">
          <span className="fs-3 fw-bold text-secondary">Our service: </span>
          At KOR we decided to do things different from the current cloud mining
          model. We believe Web3 is the future. Following suit with that model,
          Your mining contracts will now be stored as NFTs on ethereum's
          blockchain. The NFTs will be ERC-721 tokens and can be traded publicly
          on Opensea. To make sure everyone who uses our service receives their
          ROI, we have given a length of 4 years for each contract. If the miner
          malfunctions, KOR will replace it and no changes would occur to your
          payout.
        </p>
        <br></br>
        <p className="text-start text-secondary text-wrap mb-0 fs-4">
          <span className="fs-3 fw-bold text-secondary">Why KOR? </span>
          You simply make more profit. That’s why. We have invested in state of
          the art immersion cooling setups that will increase your payouts. This
          is because when a miner is submerged in dielectric fluid it can bring
          the internal temperature of the miner lower than the traditional air
          cooled setup. In lower temperatures the miners can be “Overclocked”
          allowing the miner to perform above factory specifications, in turn
          producing more profit. With our integration on Opensea, you now can
          sell your miner peer to peer and receive payment immediately without
          having to deal with 3rd parties such as Ebay and Alibaba.
        </p>
        <br></br>
        <p className="text-start text-secondary text-wrap mb-0 fs-4">
          <span className="fs-3 fw-bold text-secondary">Payouts: </span>
          Mining profits will be sent to KORs main wallet. The smart contract of
          the NFT will determine how much profit was mined in the given time
          period minus the service fee which includes electricity, hosting, and
          maintenance before sending to your wallet that is holding the NFT.
          Profits will be sent as USDC (ERC20) every two weeks on Friday. The
          service fee is 33% of the total amount that was mined.
        </p>
        <br></br>
        <p className="text-start text-secondary text-wrap mb-0 fs-4">
          <span className="fs-3 fw-bold text-secondary">How to Join: </span>
          With our integration to Web3 it is easier than ever to join KOR.
          <br></br>
          <div className="d-flex justify-content-center">
            1.Connect metamask
            <br></br>
            2.Click Choose Miner
            <br></br>
            3.Browse and select the Miner of choice
            <br></br>
            4.Click Mint Contract
            <br></br>
            5.Confirm on metamask
          </div>
        </p>
        <br></br>
        <p className="text-start text-secondary text-wrap mb-0 fs-4">
          You will receive the NFT in your metamask as a receipt of the contract
          you have selected.
        </p>
      </div>
      <div className="d-flex justify-content-center mt-3 mb-5">
        <Button variant="primary" size="lg">
          <Link to="/mint" className="minerLink">
            Choose Miner
          </Link>
        </Button>{" "}
      </div>
    </Row>
  );
}
