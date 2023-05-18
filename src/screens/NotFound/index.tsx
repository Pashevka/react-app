import React from "react";
import { Button, Col, Container, Row } from "react-bootstrap";

const NotFound: React.FC = () => {
  return (
    <Container>
      <Row className="justify-content-center mt-5">
        <Col md={6} className="text-center text-light">
          <h1>404</h1>
          <h2>Page Not Found</h2>
          <p>The page you are looking for does not exist.</p>
          <Button href="/" variant="primary">
            Go Home
          </Button>
        </Col>
      </Row>
    </Container>
  );
};

export default NotFound;
