import { Row, Button } from "react-bootstrap";
import { useEffect, useState } from "react";

export default function Mining() {
  return (
    <Row className="align-center gradient-background" id="mining">
      <div className="about-text">
        <p className="text-center text-darkblue mb-0 fs-1 fw-bold">
          A mining pool is a joint group of cryptocurrency miners who combine
          their computational resources over a network to strengthen the
          probability of finding a block or otherwise successfully mining for
          cryptocurrency .
        </p>
      </div>
      <div className="d-flex justify-center mt-3 mb-5">
        <Button variant="primary" size="lg">
          Choose Miner
        </Button>{" "}
      </div>
    </Row>
  );
}
