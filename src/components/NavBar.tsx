import { Row, Navbar, Container, Nav, Button } from "react-bootstrap";
import { useEffect, useState } from "react";

export default function NavBar() {
  return (
    <Row className="menubar">
      <Navbar bg="dark" variant="dark">
        <Container>
          <Nav className="me-auto">
            <Nav.Link href="#home">HOME</Nav.Link>
            <Nav.Link href="#about-us">ABOUT US</Nav.Link>
            <Nav.Link href="#mining">MINING</Nav.Link>
            <Nav.Link href="#roadmap">ROADMAP</Nav.Link>
          </Nav>
          <Button variant="primary" size="lg">
            Connect Wallet
          </Button>
        </Container>
      </Navbar>
    </Row>
  );
}
