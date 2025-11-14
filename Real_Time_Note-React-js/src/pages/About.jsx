import React from 'react';
import { Container, Row, Col, Card, Badge } from 'react-bootstrap';
import Navbar from '../components/Navbar';

const About = () => {
  return (
    <>
      <Navbar />
      <Container className="py-5">
        <Row className="mb-5">
          <Col>
            <div className="text-center mb-5">
              <h1 className="display-4 fw-bold text-primary mb-3">
                Real-Time Multiuser Note Taking App
              </h1>
              <p className="lead text-muted">
                A modern, full-stack web application for managing your notes with multi-user support
              </p>
            </div>
          </Col>
        </Row>

        <Row className="mb-5">
          <Col md={8} className="mx-auto">
            <Card className="shadow-sm border-0 mb-4">
              <Card.Body className="p-4">
                <h2 className="h4 mb-3">About the Project</h2>
                <p className="mb-3">
                  The Real-Time Multiuser Note Taking App is a comprehensive web application designed
                  to help users efficiently manage their notes. Built with modern web technologies,
                  it provides a seamless experience for creating, editing, and organizing notes
                  with support for multiple users.
                </p>
                <h3 className="h5 mb-3">Features</h3>
                <ul>
                  <li>User authentication with secure JWT tokens</li>
                  <li>Create, read, update, and delete notes</li>
                  <li>Multi-user support with role-based access control</li>
                  <li>Admin panel for user and note management</li>
                  <li>Responsive design for all devices</li>
                  <li>Real-time updates and notifications</li>
                </ul>
              </Card.Body>
            </Card>
          </Col>
        </Row>

        <Row className="mb-5">
          <Col>
            <h2 className="text-center mb-4">Technology Stack</h2>
            <Row className="g-4">
              <Col md={4}>
                <Card className="h-100 shadow-sm border-0">
                  <Card.Body className="text-center p-4">
                    <div className="mb-3" style={{ fontSize: '3rem' }}>⚛️</div>
                    <h4>Frontend</h4>
                    <div className="d-flex flex-wrap justify-content-center gap-2">
                      <Badge bg="primary">React.js</Badge>
                      <Badge bg="success">Bootstrap</Badge>
                      <Badge bg="info">Vite</Badge>
                      <Badge bg="warning" text="dark">Axios</Badge>
                    </div>
                  </Card.Body>
                </Card>
              </Col>
              <Col md={4}>
                <Card className="h-100 shadow-sm border-0">
                  <Card.Body className="text-center p-4">
                    <div className="mb-3" style={{ fontSize: '3rem' }}>🚀</div>
                    <h4>Backend</h4>
                    <div className="d-flex flex-wrap justify-content-center gap-2">
                      <Badge bg="danger">Node.js</Badge>
                      <Badge bg="secondary">Express.js</Badge>
                      <Badge bg="success">MongoDB</Badge>
                      <Badge bg="warning" text="dark">JWT</Badge>
                    </div>
                  </Card.Body>
                </Card>
              </Col>
              <Col md={4}>
                <Card className="h-100 shadow-sm border-0">
                  <Card.Body className="text-center p-4">
                    <div className="mb-3" style={{ fontSize: '3rem' }}>🔐</div>
                    <h4>Security</h4>
                    <div className="d-flex flex-wrap justify-content-center gap-2">
                      <Badge bg="dark">bcrypt</Badge>
                      <Badge bg="primary">JWT Auth</Badge>
                      <Badge bg="success">RBAC</Badge>
                    </div>
                  </Card.Body>
                </Card>
              </Col>
            </Row>
          </Col>
        </Row>

        <Row>
          <Col>
            <h2 className="text-center mb-4">Development Team</h2>
            <Row className="g-4">
              <Col md={4}>
                <Card className="h-100 shadow-sm border-0">
                  <Card.Body className="text-center p-4">
                    <img 
                      src="/src/Images/krushna.jpg" 
                      alt="Krushna Chavan" 
                     className="rounded-square mb-3" 
                      style={{ width: '120px', height: '150px', objectFit: 'cover' }}
                    />
                    <h4>Krushna Chavan</h4>
                    <p className="text-muted mb-3">Full Stack Developer</p>
                    <p className="small">
                      Experienced in React.js, Node.js, and MongoDB. Passionate about creating
                      user-friendly applications with clean code and modern design patterns.
                    </p>
                  </Card.Body>
                </Card>
              </Col>
              <Col md={4}>
                <Card className="h-100 shadow-sm border-0">
                  <Card.Body className="text-center p-4">
                    <img 
                      src="/src/Images/shamal.jpg" 
                      alt="Shamal Bhujbal" 
                    className="rounded-square mb-3"  
                       style={{ width: '120px', height: '150px', objectFit: 'cover' }}
                    />
                    <h4>Shamal Bhujbal</h4>
                    <p className="text-muted mb-3">Frontend Developer</p>
                    <p className="small">
                      Specializes in React.js and UI/UX design. Focuses on creating responsive,
                      accessible, and visually appealing user interfaces.
                    </p>
                  </Card.Body>
                </Card>
              </Col>
              <Col md={4}>
                <Card className="h-100 shadow-sm border-0">
                  <Card.Body className="text-center p-4">
                    <img 
                      src="/src/Images/saloni.jpeg" 
                      alt="Saloni Chavande" 
                      className="rounded-square mb-3" 
                      style={{ width: '120px', height: '150px', objectFit: 'cover' }}
                    />
                    <h4>Saloni Chavande </h4>
                    <p className="text-muted mb-3">Backend Developer</p>
                    <p className="small">
                      Expert in Node.js, Express.js, and database design. Ensures secure and
                      scalable backend architecture with proper authentication and authorization.
                    </p>
                  </Card.Body>
                </Card>
              </Col>
            </Row>
          </Col>
        </Row>

        <Row className="mt-5">
          <Col>
            <Card className="bg-light border-0">
              <Card.Body className="text-center p-4">
                <h3 className="mb-3">Project Purpose</h3>
                <p className="mb-0">
                  This application demonstrates modern full-stack development practices, including
                  RESTful API design, JWT authentication, role-based access control, and responsive
                  frontend design. It serves as a foundation for building scalable multi-user
                  applications with proper security measures and user management capabilities.
                </p>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default About;