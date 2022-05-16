import { useEffect, useState } from "react";
import { Row, Col } from "react-bootstrap";

export default function HowTo() {
  const [isiOS, setIsiOS] = useState(false);

  useEffect(async () => {
    setIsiOS(iOS());
  }, []);

  const iOS = () => {
    return (
      [
        "iPad Simulator",
        "iPhone Simulator",
        "iPod Simulator",
        "iPad",
        "iPhone",
        "iPod",
      ].includes(navigator.platform) ||
      // iPad on iOS 13 detection
      (navigator.userAgent.includes("Mac") && "ontouchend" in document)
    );
  };
  return (
    <Row
      className="align-items-center bubble-background text-center"
      id="how-to"
    >
      <div className="h-100 position-relative p-0 margin-top-100">
        <h2>Revised kor walkthrough (How to buy a miner on KOR’s DAPP) </h2>
        <video
          autoPlay={isiOS ? false : true}
          controls={isiOS ? true : false}
          muted
          loop
          src="video/Revised kor walkthrough.mp4"
          className="w-100"
        />
      </div>
      <div className="h-100 position-relative p-0 margin-top-100">
        <h2>USDC vid (How to add USDC to metamask)</h2>
        <video
          autoPlay={isiOS ? false : true}
          controls={isiOS ? true : false}
          muted
          loop
          src="video/USDC vid.mp4"
          className="w-100"
        />
      </div>
      <div className="h-100 position-relative p-0 margin-top-100">
        <h2>How to deposit money to crypto.com</h2>
        <video
          autoPlay={isiOS ? false : true}
          controls={isiOS ? true : false}
          muted
          loop
          src="https://www.youtube.com/watch?v=3IK555AX8nc"
          className="w-100"
        />
      </div>
      <div className="h-100 position-relative p-0 margin-top-100">
        <h2>How to withdraw and deposit crypto to metamask</h2>
        <video
          autoPlay={isiOS ? false : true}
          controls={isiOS ? true : false}
          muted
          loop
          src="https://www.youtube.com/watch?v=4WG3Q6t4XqE"
          className="w-100"
        />
      </div>
      <div className="h-100 position-relative p-0 margin-top-100">
        <h2>How to sell your NFT on Opensea</h2>
        <video
          autoPlay={isiOS ? false : true}
          controls={isiOS ? true : false}
          muted
          loop
          src="https://www.youtube.com/watch?v=4ftt5j8hwS4"
          className="w-100"
        />
      </div>
    </Row>
  );
}
