'use client';
import Image from "next/image";
import { Container, Row, Col, Card, Button } from "react-bootstrap";
import { Inter } from 'next/font/google'
import 'bootstrap/dist/css/bootstrap.min.css'
import '@/app/globals.css'

const inter = Inter({ subsets: ['latin'] })

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <Container>
      <Row>
        <Col sm={12} className="align-items-center d-flex" style={{height: '100vh'}}>
          <Card className="w-100">
            {children}
          </Card>
        </Col>
      </Row>
    </Container>
  )
}
