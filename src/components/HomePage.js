import Row from "react-bootstrap/Row";

export default function HomePage() {
  return (
    <Row className="align-items-center fixed-menubar" id="home">
      <div className="h-100 position-relative p-0">
        <video
          autoPlay
          muted
          loop
          src="video/Futuristic_HiTech_Intro_1080p.mp4"
          className="w-100"
        />
      </div>
    </Row>
  );
}
