// src/components/Footer.jsx
import React from 'react';
import { Container } from 'react-bootstrap';
import { FiHeart } from 'react-icons/fi';

const Footer = () => {
  return (
    <footer className="footer bg-light text-center py-3 border-top mt-auto">
      <Container>
        <small className="text-muted">
          Made with <FiHeart color="red" /> by <strong>Krushna Chavan , Shamal Bhujbal  , Saloni Chavande </strong> © {new Date().getFullYear()}
        </small>
      </Container>
    </footer>
  );
};

export default Footer;
