import Row from "react-bootstrap/Row";

export default function HomePage() {
  return (
    <Row className="align-center" id="home">
      <div className="h-100 position-relative p-0">
        {/* <img
          src="images/mining-pool.jpg"
          className="img-fluid shadow-4 w-100"
        /> */}
        <video autoPlay muted loop src="video/intro.mp4" className="w-100" />
        {/* <div className="position-absolute w-100 h-100 d-flex start-0 top-0 justify-center align-center">
          <p className="text-light mb-0 fs-1 fw-bold">
            The World's first ever mining service on Web3
          </p>
        </div> */}
      </div>
    </Row>
  );
}
