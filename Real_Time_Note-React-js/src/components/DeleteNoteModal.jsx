import React, { useState } from 'react';
import { Modal, Button, Alert } from 'react-bootstrap';
import { FiTrash2, FiAlertTriangle } from 'react-icons/fi';
import axios from 'axios';

const DeleteNoteModal = ({ show, onHide, note, onNoteDeleted }) => {
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleDelete = async () => {
    setError('');
    setLoading(true);
    try {
      const response = await axios.delete(`/api/notes/${note._id}`);
      if (response.data.success) {
        onNoteDeleted();
      }
    } catch (error) {
      setError(error.response?.data?.message || 'Failed to delete note');
      setLoading(false);
    }
  };

  const handleClose = () => {
    setError('');
    onHide();
  };

  if (!note) return null;

  return (
    <Modal show={show} onHide={handleClose} centered>
      <Modal.Header closeButton>
        <Modal.Title className="d-flex align-items-center gap-2 text-danger">
          <FiTrash2 /> Delete Note
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {error && (
          <Alert variant="danger" dismissible onClose={() => setError('')}>
            {error}
          </Alert>
        )}

        <div className="text-center mb-3">
          <div className="text-warning mb-3" style={{ fontSize: '3rem' }}>
            <FiAlertTriangle />
          </div>
          <p className="fs-5 mb-3">Are you sure you want to delete this note?</p>
        </div>
        
        <div className="border p-3 rounded" style={{ backgroundColor: 'var(--accent)' }}>
          <div className="d-flex align-items-start gap-2 mb-2">
            <FiTrash2 className="text-muted mt-1" size={16} />
            <strong className="text-dark">{note.title}</strong>
          </div>
          <p className="text-muted mb-0 ms-4" style={{ fontSize: '0.9rem' }}>
            {note.content.substring(0, 120)}
            {note.content.length > 120 ? '...' : ''}
          </p>
        </div>
        
        <div className="alert alert-danger mt-3 d-flex align-items-center gap-2" style={{ fontSize: '0.9rem' }}>
          <FiAlertTriangle size={16} />
          <span>This action cannot be undone.</span>
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose} disabled={loading}>
          No, Cancel
        </Button>
        <Button variant="danger" onClick={handleDelete} disabled={loading} className="px-4">
          <FiTrash2 className="me-2" />
          {loading ? 'Deleting...' : 'Yes, Delete Note'}
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default DeleteNoteModal;

