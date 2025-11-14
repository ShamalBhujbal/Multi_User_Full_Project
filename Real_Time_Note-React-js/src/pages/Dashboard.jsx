import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Button, Alert, Spinner } from 'react-bootstrap';
import { FiPlus, FiEdit2, FiTrash2, FiDownloadCloud, FiFileText } from 'react-icons/fi';
import jsPDF from 'jspdf';//js library to create pdf
import 'jspdf-autotable';
import Navbar from '../components/Navbar';
import AddNoteModal from '../components/AddNoteModal';
import EditNoteModal from '../components/EditNoteModal';
import DeleteNoteModal from '../components/DeleteNoteModal';
import axios from 'axios';

const Dashboard = () => {
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedNote, setSelectedNote] = useState(null);
  const [alert, setAlert] = useState({ show: false, message: '', variant: 'success' });

  useEffect(() => {
    fetchNotes();
  }, []);

  const fetchNotes = async () => {
    try {
      setLoading(true);
      const response = await axios.get('/api/notes');
      if (response.data.success) {
        setNotes(response.data.data);
      }
    } catch (error) {
      showAlert('Failed to fetch notes', 'danger');
    } finally {
      setLoading(false);
    }
  };

  const showAlert = (message, variant = 'success') => {
    setAlert({ show: true, message, variant });
    setTimeout(() => {
      setAlert({ show: false, message: '', variant: 'success' });
    }, 3000);
  };

  const handleAddNote = () => {
    setSelectedNote(null);
    setShowAddModal(true);
  };

  const handleEditNote = (note) => {
    setSelectedNote(note);
    setShowEditModal(true);
  };

  const handleDeleteNote = (note) => {
    setSelectedNote(note);
    setShowDeleteModal(true);
  };

  const handleDownloadPdf = () => {
    try {
      const doc = new jsPDF({ unit: 'pt', format: 'a4' }); //
      const pageWidth = doc.internal.pageSize.getWidth();
      const margin = 48;
      let y = margin;

      // Header
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(18);
      doc.text('My Notes', margin, y);
      doc.setFont('helvetica', 'normal');
      doc.setFontSize(10);
      const dateStr = new Date().toLocaleString();
      doc.text(dateStr, pageWidth - margin, y, { align: 'right' });
      y += 24;
      doc.setDrawColor(160);
      doc.line(margin, y, pageWidth - margin, y);
      y += 20;

      if (!notes || notes.length === 0) {
        doc.setFontSize(12);
        doc.text('No notes available.', margin, y);
      } else {
        notes.forEach((n, idx) => {
          const title = n.title || 'Untitled Note';
          const content = n.content || '';
          const updated = n.updatedAt ? new Date(n.updatedAt).toLocaleString() : '';

          // Ensure space; add new page if close to bottom
          const bottom = doc.internal.pageSize.getHeight() - margin;
          if (y + 120 > bottom) {
            doc.addPage();
            y = margin;
          }

          doc.setFont('helvetica', 'bold');
          doc.setFontSize(14);
          doc.text(`${idx + 1}. ${title}`, margin, y);
          y += 16;
          doc.setFont('helvetica', 'normal');
          doc.setFontSize(10);
          if (updated) {
            doc.text(`Updated: ${updated}`, margin, y);
            y += 12;
          }

          doc.setFontSize(12);
          const textWidth = pageWidth - margin * 2;
          const lines = doc.splitTextToSize(content, textWidth);
          lines.forEach(line => {
            if (y + 20 > bottom) {
              doc.addPage();
              y = margin;
            }
            doc.text(line, margin, y);
            y += 16;
          });

          y += 12;
          doc.setDrawColor(220);
          doc.line(margin, y, pageWidth - margin, y);
          y += 18;
        });
      }

      doc.save('my-notes.pdf');
    } catch (e) {
      showAlert('Failed to generate PDF', 'danger');
    }
  };

  const handleNoteAdded = () => {
    setShowAddModal(false);
    fetchNotes();
    showAlert('✅ Note added successfully!', 'success');
  };

  const handleNoteUpdated = () => {
    setShowEditModal(false);
    fetchNotes();
    showAlert('✅ Note updated successfully!', 'success');
  };

  const handleNoteDeleted = () => {
    setShowDeleteModal(false);
    fetchNotes();
    showAlert('🗑️ Note deleted successfully!', 'success');
  };

  return (
    <>
      <Navbar />
      <Container fluid className="py-4 fade-in">
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

        <Row className="mb-4">
          <Col>
            <div className="d-flex justify-content-between align-items-center flex-wrap">
              <div>
                <h2 className="mb-1 d-flex align-items-center gap-2"><FiFileText /> My Notes</h2>
                <p className="text-muted mb-0">Manage your personal notes</p>
              </div>
              <div className="d-flex gap-2 mt-3 mt-md-0">
                <Button variant="outline-primary" size="lg" onClick={handleDownloadPdf}>
                  <FiDownloadCloud className="me-2" /> Notes Export
                </Button>
                <Button variant="primary" size="lg" onClick={handleAddNote}>
                  <FiPlus className="me-2" /> Add Note
                </Button>
              </div>
            </div>
          </Col>
        </Row>

        {loading ? (
          <div className="text-center py-5">
            <Spinner animation="border" role="status" variant="primary">
              <span className="visually-hidden">Loading...</span>
            </Spinner>
          </div>
        ) : notes.length === 0 ? (
          <Card className="empty-state border-0 shadow-sm fade-in">
            <Card.Body>
              <div className="empty-state-icon">
                <FiFileText />
              </div>
              <Card.Title className="h3 mb-3">No notes yet</Card.Title>
              <Card.Text className="text-muted mb-4 fs-5">
                Start capturing your ideas and thoughts with your first note!
              </Card.Text>
              <Button variant="primary" size="lg" onClick={handleAddNote} className="px-4">
                <FiPlus className="me-2" /> Create Your First Note
              </Button>
            </Card.Body>
          </Card>
        ) : (
          <Row>
            {notes.map((note, index) => (
              <Col key={note._id} xs={12} sm={6} md={4} lg={3} className="mb-4">
                <Card className="note-card shadow-sm border-0 fade-in" style={{ animationDelay: `${index * 0.1}s` }}>
                  <Card.Body>
                    <div className="d-flex align-items-start justify-content-between mb-3">
                      <Card.Title className="h5 mb-0 flex-grow-1" style={{ lineHeight: '1.3' }}>
                        {note.title}
                      </Card.Title>
                      <div className="text-muted ms-2" style={{ fontSize: '1.25rem', opacity: 0.4 }}>
                        <FiFileText />
                      </div>
                    </div>
                    <Card.Text className="note-content text-muted">
                      {note.content}
                    </Card.Text>
                    <div className="note-actions">
                      <small className="text-muted d-block mb-3">
                        <span className="fw-medium">Last updated:</span> {new Date(note.updatedAt).toLocaleDateString('en-US', { 
                          month: 'short', 
                          day: 'numeric', 
                          year: 'numeric' 
                        })}
                      </small>
                      <div className="d-flex gap-2">
                        <Button
                          variant="outline-primary"
                          size="sm"
                          className="flex-fill"
                          onClick={() => handleEditNote(note)}
                        >
                          <FiEdit2 className="me-1" /> Edit
                        </Button>
                        <Button
                          variant="outline-danger"
                          size="sm"
                          className="flex-fill"
                          onClick={() => handleDeleteNote(note)}
                        >
                          <FiTrash2 className="me-1" /> Delete
                        </Button>
                      </div>
                    </div>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
        )}

        <AddNoteModal
          show={showAddModal}
          onHide={() => setShowAddModal(false)}
          onNoteAdded={handleNoteAdded}
        />

        <EditNoteModal
          show={showEditModal}
          onHide={() => setShowEditModal(false)}
          note={selectedNote}
          onNoteUpdated={handleNoteUpdated}
        />

        <DeleteNoteModal
          show={showDeleteModal}
          onHide={() => setShowDeleteModal(false)}
          note={selectedNote}
          onNoteDeleted={handleNoteDeleted}
        />
      </Container>
    </>
  );
};

export default Dashboard;

