import React, { useState } from 'react';
import { Container, Row, Col, Card, Form, Button, Alert } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import Navbar from '../components/Navbar';

const Signup = () => {
  const [formData, setFormData] = useState({ name: '', email: '', password: '' });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const { signup } = useAuth();
  const navigate = useNavigate();

  const nameRegex = /^[A-Za-z\s]{3,}$/; // 
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; //@gmail.com
  const passwordRegex =
    /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%?&])[A-Za-z\d@$!%?&]{6,}$/; // 

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value }); 
    setErrors((prev) => ({ ...prev, [name]: '' }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault(); //
    setLoading(true);

    let newErrors = {};
    const { name, email, password } = formData; //

    if (!name) newErrors.name = 'Name is required.';
    else if (!nameRegex.test(name))
      newErrors.name = 'Please enter a valid name (only letters, min 3 characters).';

    if (!email) newErrors.email = 'Email is required.';
    else if (!emailRegex.test(email))
      newErrors.email = 'Please enter a valid email address add @.';

    if (!password) newErrors.password = 'Password is required.';
    else if (!passwordRegex.test(password))
      newErrors.password =
        'Password must contain uppercase, lowercase, number, and special character.';

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      setLoading(false);
      return;
    }

    const result = await signup(name, email, password);

    if (result.success) navigate('/dashboard');
    else {
      setErrors({ general: result.message });
      setLoading(false);
    }
  };

  return (
    <>
      <Navbar />
      <Container className="mt-5">
        <Row className="justify-content-center">
          <Col xs={12} sm={10} md={8} lg={6}>
            <Card className="shadow">
              <Card.Body className="p-4">
                <Card.Title className="text-center mb-4">
                  <h2>Sign Up</h2>
                  <p className="text-muted">Create your account to get started</p>
                </Card.Title>

                {errors.general && (
                  <Alert
                    variant="danger"
                    dismissible
                    onClose={() => setErrors((prev) => ({ ...prev, general: '' }))}
                  >
                    {errors.general}
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
                    <Form.Label>Password</Form.Label>
                    <Form.Control
                      type="password"
                      name="password"
                      value={formData.password}
                      onChange={handleChange}
                      placeholder="Enter a strong password"
                      isInvalid={!!errors.password}
                    />
                    {errors.password ? (
                      <Form.Text className="text-danger">{errors.password}</Form.Text>
                    ) : (
                      <Form.Text className="text-muted">
                        Use at least one uppercase, one lowercase, one number, and a special
                        character.
                      </Form.Text>
                    )}
                  </Form.Group>

                  <Button
                    variant="primary"
                    type="submit"
                    className="w-100 mb-3"
                    disabled={loading}
                  >
                    {loading ? 'Signing Up...' : 'Sign Up'}
                  </Button>
                </Form>

                <div className="text-center">
                  <p className="mb-0">
                    Already have an account?{' '}
                    <Link to="/login" className="text-decoration-none">
                      Login here
                    </Link>
                  </p>
                </div>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default Signup;
