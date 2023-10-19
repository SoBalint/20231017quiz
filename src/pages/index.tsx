'use client';
import { Card, Row, Col, Container, Button } from 'react-bootstrap'
import Image from 'next/image'
import RootLayout from '@/app/layout';

export default function Home() {
  return (
    <RootLayout>
      <Card.Header className="d-flex justify-content-center">
        <Image src={"/logo.png"} width={200} height={200} alt="Logo" />
      </Card.Header>
      <Card.Body>
        <Container>
          <Row>
            <Col className="d-flex justify-content-center">
              <Card.Title>Quiz - Gyere játsz velünk...</Card.Title>
            </Col>
          </Row>
          <Row>
            <Col className="d-flex justify-content-center">
              <Button id="AllButton" variant="success" size="lg" onClick={() => {location.href="/quiz"}}>Start</Button>
            </Col>
          </Row>
        </Container>
      </Card.Body>
    </RootLayout>
  )
}
