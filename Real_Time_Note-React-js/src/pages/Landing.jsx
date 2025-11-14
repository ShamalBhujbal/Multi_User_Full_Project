import React from 'react';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';

const Landing = () => {
  return (
    <>
      <Navbar />
      <Container fluid className="py-5">
        {/* Hero Section */}
        <Row className="mb-5 py-5">
          <Col className="text-center">
            <h1 className="display-3 fw-bold text-primary mb-4">
              📝 Welcome to Note Taking App
            </h1>
            <p className="lead text-muted mb-4" style={{ maxWidth: '600px', margin: '0 auto' }}>
              Organize your thoughts, capture your ideas, and never forget important information. 
              Your personal note-taking companion is here to help you stay organized.
            </p>
            <div className="d-flex gap-3 justify-content-center flex-wrap mt-4">
              <Button as={Link} to="/signup" variant="primary" size="lg">
                Get Started
              </Button>
              <Button as={Link} to="/login" variant="outline-primary" size="lg">
                Sign In
              </Button>
            </div>
          </Col>
        </Row>

        {/* Features Section */}
        <Row className="mb-5 g-4">
          <Col>
            <h2 className="text-center mb-5">Why Choose Our Note Taking App?</h2>
          </Col>
        </Row>
        <Row className="g-4 mb-5">
          <Col md={4}>
            <Card className="h-100 shadow-sm border-0 text-center">
              <Card.Body className="p-4">
                <div style={{ fontSize: '3.5rem', marginBottom: '1rem' }}>🔐</div>
                <Card.Title className="h4 mb-3">Secure & Private</Card.Title>
                <Card.Text className="text-muted">
                  Your notes are encrypted and secure. Only you have access to your personal notes 
                  and information. We take your privacy seriously.
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
          <Col md={4}>
            <Card className="h-100 shadow-sm border-0 text-center">
              <Card.Body className="p-4">
                <div style={{ fontSize: '3.5rem', marginBottom: '1rem' }}>⚡</div>
                <Card.Title className="h4 mb-3">Fast & Responsive</Card.Title>
                <Card.Text className="text-muted">
                  Built with modern technology for lightning-fast performance. Access your notes 
                  instantly from any device, anywhere you go.
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
          <Col md={4}>
            <Card className="h-100 shadow-sm border-0 text-center">
              <Card.Body className="p-4">
                <div style={{ fontSize: '3.5rem', marginBottom: '1rem' }}>📱</div>
                <Card.Title className="h4 mb-3">Accessible Everywhere</Card.Title>
                <Card.Text className="text-muted">
                  Responsive design means your notes look great on desktop, tablet, or mobile. 
                  Capture ideas on the go and access them from anywhere.
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
        </Row>

        {/* How It Works Section */}
        <Row className="mb-5">
          <Col>
            <Card className="bg-light border-0 shadow-sm">
              <Card.Body className="p-5">
                <h2 className="text-center mb-4">How It Works</h2>
                <Row className="g-4">
                  <Col md={4} className="text-center">
                    <div className="mb-3">
                      <div 
                        style={{ 
                          fontSize: '2.5rem', 
                          width: '80px', 
                          height: '80px', 
                          borderRadius: '50%', 
                          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          margin: '0 auto',
                          color: 'white',
                          fontWeight: 'bold'
                        }}
                      >
                        1
                      </div>
                    </div>
                    <h4>Sign Up</h4>
                    <p className="text-muted">
                      Create your free account in seconds. Just provide your name, email, and password.
                    </p>
                  </Col>
                  <Col md={4} className="text-center">
                    <div className="mb-3">
                      <div 
                        style={{ 
                          fontSize: '2.5rem', 
                          width: '80px', 
                          height: '80px', 
                          borderRadius: '50%', 
                          background: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          margin: '0 auto',
                          color: 'white',
                          fontWeight: 'bold'
                        }}
                      >
                        2
                      </div>
                    </div>
                    <h4>Create Notes</h4>
                    <p className="text-muted">
                      Start organizing your thoughts. Create, edit, and manage your notes with ease.
                    </p>
                  </Col>
                  <Col md={4} className="text-center">
                    <div className="mb-3">
                      <div 
                        style={{ 
                          fontSize: '2.5rem', 
                          width: '80px', 
                          height: '80px', 
                          borderRadius: '50%', 
                          background: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          margin: '0 auto',
                          color: 'white',
                          fontWeight: 'bold'
                        }}
                      >
                        3
                      </div>
                    </div>
                    <h4>Stay Organized</h4>
                    <p className="text-muted">
                      Keep all your important information in one place. Access your notes anytime, anywhere.
                    </p>
                  </Col>
                </Row>
              </Card.Body>
            </Card>
          </Col>
        </Row>

        {/* Call to Action */}
        <Row>
          <Col className="text-center">
            <Card className="border-0 shadow-lg" style={{ background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', color: 'white' }}>
              <Card.Body className="p-5">
                <h2 className="mb-3">Ready to Get Started?</h2>
                <p className="lead mb-4">
                  Join thousands of users who are already organizing their lives with our note-taking app.
                </p>
                <Button as={Link} to="/signup" variant="light" size="lg">
                  Create Your Free Account Now
                </Button>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default Landing;

