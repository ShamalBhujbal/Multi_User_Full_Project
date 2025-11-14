import React, { useState } from 'react';
import { Container, Row, Col, Card, Form, Button, Alert } from 'react-bootstrap';
import Navbar from '../components/Navbar';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });

  const [errors, setErrors] = useState({});
  const [alert, setAlert] = useState({ show: false, variant: '', message: '' });
  const [loading, setLoading] = useState(false);

  const nameRegex = /^[A-Za-z\s]{3,}$/;
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: '' }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);

    const newErrors = {};
    const { name, email, message } = formData;

    if (!name.trim()) {
      newErrors.name = 'Name is required.';
    } else if (!nameRegex.test(name)) {
      newErrors.name = 'Enter a valid name (letters only, min 3 characters).';
    }

    if (!email.trim()) {
      newErrors.email = 'Email is required.';
    } else if (!emailRegex.test(email)) {
      newErrors.email = 'Enter a valid email address.';
    }

    if (!message.trim()) {
      newErrors.message = 'Message is required.';
    } else if (message.trim().length < 10) {
      newErrors.message = 'Message should be at least 10 characters long.';
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      setLoading(false);
      return;
    }

    setTimeout(() => {
      setAlert({
        show: true,
        variant: 'success',
        message: 'Thank you for your message! We’ll get back to you soon.',
      });
      setFormData({ name: '', email: '', message: '' });
      setErrors({});
      setLoading(false);
    }, 1000);
  };

  return (
    <>
      <Navbar />
      <Container className="py-5">
        <Row className="justify-content-center">
          <Col xs={12} md={8} lg={6}>
            <Card className="shadow-sm border-0">
              <Card.Body className="p-4">
                <div className="text-center mb-4">
                  <h2 className="mb-2">Contact Us</h2>
                  <p className="text-muted">
                    Have questions? We'd love to hear from you. Send us a message and we’ll respond as soon as possible.
                  </p>
                </div>

                {alert.show && (
                  <Alert
                    variant={alert.variant}
                    dismissible
                    onClose={() => setAlert({ ...alert, show: false })}
                    className="mb-4"
                  >
                    {alert.message}
                  </Alert>
                )}

                <Form noValidate onSubmit={handleSubmit}>
                  <Form.Group className="mb-3">
                    <Form.Label>Name</Form.Label>
                    <Form.Control
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="Enter your name"
                      isInvalid={!!errors.name}
                    />
                    {errors.name && (
                      <Form.Text className="text-danger">{errors.name}</Form.Text>
                    )}
                  </Form.Group>

                  <Form.Group className="mb-3">
                    <Form.Label>Email</Form.Label>
                    <Form.Control
                      type="text"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="Enter your email"
                      isInvalid={!!errors.email}
                    />
                    {errors.email && (
                      <Form.Text className="text-danger">{errors.email}</Form.Text>
                    )}
                  </Form.Group>

                  <Form.Group className="mb-3">
                    <Form.Label>Message</Form.Label>
                    <Form.Control
                      as="textarea"
                      rows={5}
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      placeholder="Enter your message"
                      isInvalid={!!errors.message}
                    />
                    {errors.message && (
                      <Form.Text className="text-danger">{errors.message}</Form.Text>
                    )}
                  </Form.Group>

                  <Button variant="primary" type="submit" className="w-100" disabled={loading}>
                    {loading ? 'Sending...' : 'Send Message'}
                  </Button>
                </Form>

                <div className="mt-4 text-center text-muted">
                  <small>
                    Note: This is a demo contact form. Messages are not currently being processed.
                  </small>
                </div>
              </Card.Body>
            </Card>

            <Card className="mt-4 shadow-sm border-0 bg-light">
              <Card.Body className="p-4">
                <h5 className="mb-3">Other Ways to Reach Us</h5>
                <Row>
                  <Col xs={12} sm={4} className="text-center mb-3 mb-sm-0">
                    <strong>Email</strong>
                    <p className="small mb-0">support@noteapp.com</p>
                  </Col>
                  <Col xs={12} sm={4} className="text-center mb-3 mb-sm-0">
                    <strong>Phone</strong>
                    <p className="small mb-0">+91 9545151536</p>
                  </Col>
                  <Col xs={12} sm={4} className="text-center">
                    <strong>Address</strong>
                    <p className="small mb-0">
                      CDAC
                      <br />
                      Kharghar
                    </p>
                  </Col>
                </Row>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default Contact;