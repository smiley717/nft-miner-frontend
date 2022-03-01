import { Row, Col } from "react-bootstrap";
import { useEffect, useState } from "react";

export default function AboutUs() {
  return (
    <Row className="align-center bubble-background" id="about-us">
      <div className="about-text">
        <p className="text-start text-darkblue mb-0 fs-4">
          Let's face it. Most people are either too busy or don't have the
          infrastructure to set up a crypto miner.
        </p>
        <br></br>
        <p className="text-start text-darkblue text-wrap mb-0 fs-4">
          Crypto miners are loud, hot, and difficult to set up for people new to
          the crypto world, or not very well versed with tech in general. Hours
          can be spent trying to find a trusted vendor, compatible wallets, as
          well as the right mining pool, setting up electricity & ventilation,
          and monitoring activity. With all of these tasks at hand, the immense
          passive income opportunities that crypto mining births are
          inaccessible to the majority of the public.
        </p>
        <br></br>
        <p className="text-start text-darkblue text-wrap mb-0 fs-4">
          At KOR, we believe everyone should be able to participate in crypto
          mining. With our knowledge, experience, and infrastructure we have the
          ability to help those who want to dive into the fruitful world of
          crypto mining by the click of a button.
        </p>
      </div>
      <Row className="teammembers">
        <Col>
          <img src="images/teammembers/1.jpg" className="img-fluid profile" />
        </Col>
        <Col>
          <img src="images/teammembers/2.jpg" className="img-fluid profile" />
        </Col>
        <Col>
          <img src="images/teammembers/3.jpg" className="img-fluid profile" />
        </Col>
        <Col>
          <img src="images/teammembers/4.jpg" className="img-fluid profile" />
        </Col>
      </Row>
    </Row>
  );
}
