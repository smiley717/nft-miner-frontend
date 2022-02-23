import { Row, Col } from "react-bootstrap";
import { useEffect, useState } from "react";

export default function AboutUs() {
  return (
    <Row className="align-center bubble-background" id="about-us">
      <div className="about-text">
        <p className="text-center text-darkblue mb-0 fs-1 fw-bold">
          A mining pool is a joint group of cryptocurrency miners who combine
          their computational resources over a network to strengthen the
          probability of finding a block or otherwise successfully mining for
          cryptocurrency .
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
