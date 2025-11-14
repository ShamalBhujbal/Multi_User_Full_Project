import React, { useState } from 'react';
import { Modal, Button, Form, Alert } from 'react-bootstrap';
import { FiPlus, FiFileText } from 'react-icons/fi';
import axios from 'axios';

const AddNoteModal = ({ show, onHide, onNoteAdded }) => {
  const [formData, setFormData] = useState({
    title: '',
    content: '',
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
    setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();//
    setError('');
    
    if (!formData.title.trim() || !formData.content.trim()) {
      setError('Title and content are required');
      return;
    }

    setLoading(true);
    try {
      const response = await axios.post('/api/notes', formData);
      if (response.data.success) {
        setFormData({ title: '', content: '' });
        onNoteAdded();
      }
    } catch (error) {
      setError(error.response?.data?.message || 'Failed to add note');
    } finally {
      setLoading(false);
    }
  };

  const handleClose = () => {
    setFormData({ title: '', content: '' });
    setError('');
    onHide();
  };

  return (
    <Modal show={show} onHide={handleClose} centered>
      <Modal.Header closeButton>
        <Modal.Title className="d-flex align-items-center gap-2">
          <FiPlus className="text-primary" /> Add New Note
        </Modal.Title>
      </Modal.Header>
      <Form onSubmit={handleSubmit}>
        <Modal.Body>
          {error && (
            <Alert variant="danger" dismissible onClose={() => setError('')}>
              {error}
            </Alert>
          )}

          <Form.Group className="mb-3">
            <Form.Label className="d-flex align-items-center gap-2">
              <FiFileText size={16} /> Title
            </Form.Label>
            <Form.Control
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              placeholder="Give your note a descriptive title..."
              required
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Content</Form.Label>
            <Form.Control
              as="textarea"
              rows={6}
              name="content"
              value={formData.content}
              onChange={handleChange}
              placeholder="Write your thoughts, ideas, or notes here..."
              required
              style={{ resize: 'vertical', minHeight: '120px' }}
            />
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Cancel
          </Button>
          <Button variant="primary" type="submit" disabled={loading} className="px-4">
            <FiPlus className="me-2" />
            {loading ? 'Creating Note...' : 'Create Note'}
          </Button>
        </Modal.Footer>
      </Form>
    </Modal>
  );
};

export default AddNoteModal;

