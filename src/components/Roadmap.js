import { Container } from "react-bootstrap";
import RoadmapStep from "./RoadmapStep";

export default function Roadmap() {
  return (
    <Container className="align-center bg-dark roadmap" id="roadmap">
      <RoadmapStep
        progress={10}
        percent="10%"
        title="Phase 1"
        detail="Private Sale, First location setup 50+ Miners, Social media, DAPP development, Second location setup 450 Miners, Immersion cooling setup, Public sale, Minermen NFT Collection"
      />
      <RoadmapStep
        progress={20}
        percent="20%"
        title="Phase 2"
        detail="Private Sale, First location setup 50+ Miners, Social media, DAPP development, Second location setup 450 Miners, Immersion cooling setup, Public sale, Minermen NFT Collection"
      />
      <RoadmapStep
        progress={40}
        percent="40%"
        title="Phase 3"
        detail="Private Sale, First location setup 50+ Miners, Social media, DAPP development, Second location setup 450 Miners, Immersion cooling setup, Public sale, Minermen NFT Collection"
      />
    </Container>
  );
}
