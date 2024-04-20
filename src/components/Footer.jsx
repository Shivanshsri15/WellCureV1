import React from "react";
import { Col, Row } from "react-bootstrap";

const Footer = () => {
  const currentYear = new Date().getFullYear();
  return (
    <footer>
      <Row className="bg-light pt-5" style={{ paddingBottom: "2rem" }}>
        <Col className="text-center ">
          <p>WellCure &copy; {currentYear}</p>
        </Col>
      </Row>
    </footer>
  );
};

export default Footer;
