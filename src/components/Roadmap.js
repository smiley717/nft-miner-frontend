import { Row } from "react-bootstrap";
import {
  VerticalTimeline,
  VerticalTimelineElement,
} from "react-vertical-timeline-component";
import "react-vertical-timeline-component/style.min.css";
import SchoolIcon from "@material-ui/icons/School";
import WorkIcon from "@material-ui/icons/Work";
import StarIcon from "@material-ui/icons/Star";

export default function Roadmap() {
  return (
    <Row className="align-items-center roadmap bg-gradient" id="roadmap">
      <VerticalTimeline>
        <VerticalTimelineElement
          className="vertical-timeline-element--work"
          contentStyle={{ background: "rgb(33 40 243)", color: "#fff" }}
          contentArrowStyle={{ borderRight: "7px solid  rgb(33, 150, 243)" }}
          // date="2022 Q1"
          iconStyle={{ background: "rgb(33, 150, 243)", color: "#fff" }}
          icon={<WorkIcon />}
        >
          <h3 className="vertical-timeline-element-title">Phase 1</h3>
          <p>
            <ul>
              <li>Private sale</li>
              <li>location setup 50+ Miners</li>
              <li>Social media (Instagram, linkedin, Discord, Tiktok)</li>
              <li>DAPP development</li>
            </ul>
          </p>
        </VerticalTimelineElement>
        <VerticalTimelineElement
          className="vertical-timeline-element--work"
          // date="2022 Q2"
          iconStyle={{ background: "rgb(33, 150, 243)", color: "#fff" }}
          icon={<WorkIcon />}
        >
          <h3 className="vertical-timeline-element-title">Phase 2</h3>
          <p>
            <ul>
              <li>Public sale</li>
              <li>Second location setup 450 Miners</li>
              <li>Overclocking Firmware, Immersion cooling setup</li>
              <li>Minermen NFT Collection</li>
            </ul>
          </p>
        </VerticalTimelineElement>
        <VerticalTimelineElement
          className="vertical-timeline-element--work"
          // date="2022 Q3"
          iconStyle={{ background: "rgb(33, 150, 243)", color: "#fff" }}
          icon={<SchoolIcon />}
        >
          <h3 className="vertical-timeline-element-title">Phase 3</h3>
          <p>
            <ul>
              <li>Renewable energy: Solar</li>
              <li>DEFI project</li>
            </ul>
          </p>
        </VerticalTimelineElement>
        <VerticalTimelineElement
          className="vertical-timeline-element--work"
          // date="2022 Q4"
          iconStyle={{ background: "rgb(233, 30, 99)", color: "#fff" }}
          icon={<StarIcon />}
        >
          <h3 className="vertical-timeline-element-title">Phase 4</h3>
          <p>To be announced</p>
        </VerticalTimelineElement>
        <VerticalTimelineElement
          iconStyle={{ background: "rgb(16, 204, 82)", color: "#fff" }}
          icon={<StarIcon />}
        />
      </VerticalTimeline>
    </Row>
  );
}
