import React from 'react';
import { Navbar as BootstrapNavbar, Nav, Container, NavDropdown, Badge } from 'react-bootstrap';
import { FiEdit3, FiLogOut, FiUser } from 'react-icons/fi';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const isAdmin = user?.role === 'admin';

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const isActive = (path) => {
    return location.pathname === path ? 'active' : '';
  };

  return (
    <BootstrapNavbar variant="dark" expand="lg" className="shadow-sm mb-4">
      <Container fluid>
        <BootstrapNavbar.Brand as={Link} to={user ? "/dashboard" : "/"} className="fw-bold d-flex align-items-center gap-2">
          <FiEdit3 />
          Note Taking App
        </BootstrapNavbar.Brand>
        <BootstrapNavbar.Toggle aria-controls="basic-navbar-nav" />
        <BootstrapNavbar.Collapse id="basic-navbar-nav">
          {user ? (
            // Authenticated User Navigation
            <>
              <Nav className="me-auto">
                <Nav.Link as={Link} to="/dashboard" className={isActive('/dashboard')}>
                  Dashboard
                </Nav.Link>
                <Nav.Link as={Link} to="/about" className={isActive('/about')}>
                  About Us
                </Nav.Link>
                <Nav.Link as={Link} to="/contact" className={isActive('/contact')}>
                  Contact Us
                </Nav.Link>
                {isAdmin && (
                  <Nav.Link as={Link} to="/admin" className={isActive('/admin')}>
                    Admin Panel
                  </Nav.Link>
                )}
              </Nav>
              <Nav>
                <NavDropdown
                  title={
                    <span>
                      <FiUser className="me-1" /> {user?.name || user?.email}
                      {isAdmin && (
                        <Badge bg="warning" text="dark" className="ms-2">
                          Admin
                        </Badge>
                      )}
                    </span>
                  }
                  id="user-dropdown"
                  align="end"
                >
                  <NavDropdown.ItemText className="text-muted">
                    <small>{user?.email}</small>
                    {isAdmin && (
                      <div>
                        <Badge bg="success" className="mt-1">Admin</Badge>
                      </div>
                    )}
                  </NavDropdown.ItemText>
                  <NavDropdown.Divider />
                  <NavDropdown.Item onClick={handleLogout}>
                    <FiLogOut className="me-2" /> Logout
                  </NavDropdown.Item>
                </NavDropdown>
              </Nav>
            </>
          ) : (

            // Guest Navigation
            
            <Nav className="ms-auto">
    
               <Nav.Link as={Link} to="/Dashboard" className={isActive('/Dashboard')}>
               Home
              </Nav.Link>
              <Nav.Link as={Link} to="/about" className={isActive('/about')}>
                About Us
              </Nav.Link>
              <Nav.Link as={Link} to="/contact" className={isActive('/contact')}>
                Contact Us
              </Nav.Link>
              <Nav.Link as={Link} to="/signup" className={isActive('/signup')}>
                Sign Up
              </Nav.Link>
              <Nav.Link as={Link} to="/login" className={isActive('/login')}>
                Sign In
              </Nav.Link>
            </Nav>
          )}
        </BootstrapNavbar.Collapse>
      </Container>
    </BootstrapNavbar>
  );
};

export default Navbar;
