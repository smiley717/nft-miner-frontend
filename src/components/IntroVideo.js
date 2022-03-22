import { Row } from "react-bootstrap";

export default function IntroVideo() {
  return (
    <Row className="align-items-center" id="intro-video">
      <div className="h-100 position-relative p-0">
        <video
          autoPlay
          muted
          loop
          src="video/Tech_Activation_Logo_1080p.mp4"
          className="w-100"
        />
      </div>
    </Row>
  );
}
