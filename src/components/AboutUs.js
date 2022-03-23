import { Row, Col } from "react-bootstrap";

export default function AboutUs() {
  return (
    <Row className="align-items-center bubble-background" id="about-us">
      <div className="about-text">
        <p className="mb-0">
          Let's face it. Most people are either too busy, or don't have the
          infrastructure to host a crypto miner.
        </p>
        <br></br>
        <p className="mb-0">
          Crypto miners are loud, hot, and difficult to set up for people new to
          the crypto world, or not very well versed with tech in general. Hours
          can be spent trying to find a trusted vendor, compatible wallets, as
          well as the right mining pool, setting up electricity & ventilation,
          and monitoring activity. With all of these tasks at hand, the immense
          passive income opportunities that crypto mining births are
          inaccessible to the majority of the public.
        </p>
        <br></br>
        <p className="mb-0">
          At KOR, we believe everyone should be able to participate in crypto
          mining. With our knowledge, experience, and infrastructure we have the
          ability to help those who want to dive into the fruitful world of
          crypto mining by the click of a button.
        </p>
      </div>
      <Row className="teammembers">
        <Col>
          <div className="d-flex justify-content-center">
            <img src="images/teammembers/1.png" className="img-fluid profile" />
          </div>
          <div className="text-center mt-3">Chase Balliette, Founder</div>
          <div className="text-center mt-3">
            <a href="https://www.linkedin.com/in/chase-balliette-17ab7a1ab/">
              LinkedIn
            </a>
          </div>
        </Col>
        <Col>
          <div className="d-flex justify-content-center">
            <img src="images/teammembers/2.png" className="img-fluid profile" />
          </div>
          <div className="text-center mt-3">Nick Mast, Operations Manager</div>
          <div className="text-center mt-3">
            <a href="https://www.linkedin.com/in/nicholas-mast-31574b183/">
              LinkedIn
            </a>
          </div>
        </Col>
      </Row>
    </Row>
  );
}
