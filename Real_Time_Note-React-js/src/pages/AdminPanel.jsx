import React, { useState, useEffect } from 'react';
import { 
  Container, 
  Row, 
  Col, 
  Card, 
  Table, 
  Button, 
  Alert, 
  Badge, 
  Form, 
  InputGroup, 
  Spinner,
  Tabs,
  Tab
} from 'react-bootstrap';
import Navbar from '../components/Navbar';
import axios from 'axios';

const AdminPanel = () => {
  const [users, setUsers] = useState([]);
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [alert, setAlert] = useState({ show: false, variant: '', message: '' });
  const [searchUser, setSearchUser] = useState('');
  const [searchNote, setSearchNote] = useState('');
  // Removed delete/edit modals - admin is view-only
  const [activeTab, setActiveTab] = useState('users');

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      setLoading(true);
      console.log('Fetching admin data...');
      
      const [usersRes, notesRes] = await Promise.all([
        axios.get('/api/admin/users'),
        axios.get('/api/admin/notes'),
      ]);

      console.log('Users response:', usersRes.data);
      console.log('Notes response:', notesRes.data);

      if (usersRes.data.success) {
        const usersData = usersRes.data.data || [];
        setUsers(usersData);
        console.log(` Loaded ${usersData.length} users:`, usersData);
      } else {
        console.error('Failed to fetch users:', usersRes.data);
        showAlert('Failed to fetch users data', 'warning');
      }
      
      if (notesRes.data.success) {
        const notesData = notesRes.data.data || [];
        setNotes(notesData);
        console.log(` Loaded ${notesData.length} notes`);
      } else {
        console.error('Failed to fetch notes:', notesRes.data);
        showAlert('Failed to fetch notes data', 'warning');
      }
    } catch (error) {
      console.error('Fetch error details:', error);
      console.error('Error response:', error.response?.data);
      const errorMessage = error.response?.data?.message || 
                          error.message || 
                          'Failed to fetch data. Make sure you have admin privileges.';
      showAlert(`Error: ${errorMessage}`, 'danger');
      
      // Set empty arrays if request fails
      setUsers([]);
      setNotes([]);
    } finally {
      setLoading(false);
    }
  };

  const showAlert = (message, variant = 'success') => {
    setAlert({ show: true, variant, message });
    setTimeout(() => {
      setAlert({ ...alert, show: false });
    }, 5000);
  };

  // Removed delete/edit handlers - admin is view-only

  const filteredUsers = users.filter(
    (user) =>
      user.name?.toLowerCase().includes(searchUser.toLowerCase()) ||
      user.email?.toLowerCase().includes(searchUser.toLowerCase()) ||
      user.role?.toLowerCase().includes(searchUser.toLowerCase())
  );

  const filteredNotes = notes.filter(
    (note) =>
      note.title?.toLowerCase().includes(searchNote.toLowerCase()) ||
      note.content?.toLowerCase().includes(searchNote.toLowerCase()) ||
      (note.user && (note.user.name?.toLowerCase().includes(searchNote.toLowerCase()) ||
                     note.user.email?.toLowerCase().includes(searchNote.toLowerCase())))
  );

  if (loading) {
    return (
      <>
        <Navbar />
        <Container className="text-center py-5">
          <Spinner animation="border" role="status" variant="primary">
            <span className="visually-hidden">Loading...</span>
          </Spinner>
          <p className="mt-3 text-muted">Loading admin data...</p>
        </Container>
      </>
    );
  }

  return (
    <>
      <Navbar />
      <Container fluid className="py-4">
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

        {/* Header Section */}
        <Row className="mb-4">
          <Col>
            <Card className="bg-primary text-white border-0 shadow-sm">
              <Card.Body className="p-4">
                <div className="d-flex justify-content-between align-items-center flex-wrap">
                  <div>
                    <h2 className="mb-2">
                      <span className="me-2"></span>
                      Admin Control Panel
                    </h2>
                    <p className="mb-0 opacity-75">
                      View all users and notes across the entire application (Read-Only Access)
                    </p>
                    <Badge bg="info" className="mt-2">View Only - No Edit/Delete Permissions</Badge>
                  </div>
                  <Button 
                    variant="light" 
                    size="lg"
                    onClick={fetchData}
                    className="mt-2 mt-md-0"
                  >
                     Refresh All Data
                  </Button>
                </div>
              </Card.Body>
            </Card>
          </Col>
        </Row>

        {/* Statistics Cards */}
        <Row className="mb-4">
          <Col md={4}>
            <Card className="border-0 shadow-sm h-100">
              <Card.Body>
                <div className="d-flex align-items-center">
                  <div className="bg-primary bg-opacity-10 rounded p-3 me-3">
                    <span style={{ fontSize: '2rem' }}>👥</span>
                  </div>
                  <div>
                    <h3 className="mb-0">{users.length}</h3>
                    <p className="text-muted mb-0">Total Users</p>
                  </div>
                </div>
              </Card.Body>
            </Card>
          </Col>
          <Col md={4}>
            <Card className="border-0 shadow-sm h-100">
              <Card.Body>
                <div className="d-flex align-items-center">
                  <div className="bg-success bg-opacity-10 rounded p-3 me-3">
                    <span style={{ fontSize: '2rem' }}>📝</span>
                  </div>
                  <div>
                    <h3 className="mb-0">{notes.length}</h3>
                    <p className="text-muted mb-0">Total Notes</p>
                  </div>
                </div>
              </Card.Body>
            </Card>
          </Col>
          <Col md={4}>
            <Card className="border-0 shadow-sm h-100">
              <Card.Body>
                <div className="d-flex align-items-center">
                  <div className="bg-danger bg-opacity-10 rounded p-3 me-3">
                    <span style={{ fontSize: '2rem' }}>👑</span>
                  </div>
                  <div>
                    <h3 className="mb-0">{users.filter(u => u.role === 'admin').length}</h3>
                    <p className="text-muted mb-0">Admin Users</p>
                  </div>
                </div>
              </Card.Body>
            </Card>
          </Col>
        </Row>

        {/* Tabs for Users and Notes */}
        <Card className="border-0 shadow-sm">
          <Card.Body className="p-0">
            <Tabs
              activeKey={activeTab}
              onSelect={(k) => setActiveTab(k)}
              className="mb-0"
            >
              <Tab eventKey="users" title={
                <span>
                  👥 All Users 
                  <Badge bg="primary" className="ms-2">{users.length}</Badge>
                </span>
              }>
                <div className="p-4">
                  <InputGroup className="mb-4">
                    <InputGroup.Text>🔍</InputGroup.Text>
                    <Form.Control
                      type="text"
                      placeholder="Search users by name, email, or role..."
                      value={searchUser}
                      onChange={(e) => setSearchUser(e.target.value)}
                    />
                  </InputGroup>

                  <div className="mb-3">
                    <Alert variant="info" className="mb-0">
                      <strong>ℹ️ View-Only Mode:</strong> You can view all users but cannot delete or modify them.
                    </Alert>
                  </div>

                  {filteredUsers.length === 0 && users.length === 0 ? (
                    <div className="text-center py-5">
                      <div style={{ fontSize: '4rem', marginBottom: '1rem' }}>👥</div>
                      <h4>No Users Found</h4>
                      <p className="text-muted">
                        Make sure you're logged in as admin and the API is working.
                      </p>
                      <Button variant="primary" onClick={fetchData}>
                         Retry
                      </Button>
                    </div>
                  ) : filteredUsers.length === 0 ? (
                    <div className="text-center py-5">
                      <p className="text-muted">No users match your search criteria</p>
                      <Button variant="outline-primary" onClick={() => setSearchUser('')}>
                        Clear Search
                      </Button>
                    </div>
                  ) : (
                    <div className="table-responsive">
                      <Table striped bordered hover className="mb-0">
                        <thead className="table-dark">
                          <tr>
                            <th>#</th>
                            <th>User ID</th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Role</th>
                            <th>Created Date</th>
                            <th>Last Updated</th>
                          </tr>
                        </thead>
                        <tbody>
                          {filteredUsers.map((user, index) => (
                            <tr key={user._id}>
                              <td>{index + 1}</td>
                              <td>
                                <small className="text-muted font-monospace">
                                  {user._id?.substring(0, 12)}...
                                </small>
                              </td>
                              <td>
                                <strong>{user.name || 'N/A'}</strong>
                              </td>
                              <td>{user.email || 'N/A'}</td>
                              <td>
                                <Badge 
                                  bg={user.role === 'admin' ? 'danger' : user.role === 'user' ? 'primary' : 'secondary'}
                                  className="px-3 py-2"
                                >
                                  {user.role?.toUpperCase() || 'USER'}
                                </Badge>
                              </td>
                              <td>
                                {user.createdAt 
                                  ? new Date(user.createdAt).toLocaleString() 
                                  : 'N/A'}
                              </td>
                              <td>
                                {user.updatedAt 
                                  ? new Date(user.updatedAt).toLocaleString() 
                                  : 'N/A'}
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </Table>
                    </div>
                  )}
                </div>
              </Tab>

              <Tab eventKey="notes" title={
                <span>
                   All Notes 
                  <Badge bg="success" className="ms-2">{notes.length}</Badge>
                </span>
              }>
                <div className="p-4">
                  <InputGroup className="mb-4">
                    <InputGroup.Text></InputGroup.Text>
                    <Form.Control
                      type="text"
                      placeholder="Search notes by title, content, or author..."
                      value={searchNote}
                      onChange={(e) => setSearchNote(e.target.value)}
                    />
                  </InputGroup>

                  <div className="mb-3">
                    <Alert variant="info" className="mb-0">
                      <strong>View-Only Mode:</strong> You can view all notes but cannot edit or delete them.
                    </Alert>
                  </div>

                  {filteredNotes.length === 0 && notes.length === 0 ? (
                    <div className="text-center py-5">
                      <div style={{ fontSize: '4rem', marginBottom: '1rem' }}>📝</div>
                      <h4>No Notes Found</h4>
                      <p className="text-muted">No notes have been created yet.</p>
                    </div>
                  ) : filteredNotes.length === 0 ? (
                    <div className="text-center py-5">
                      <p className="text-muted">No notes match your search criteria</p>
                      <Button variant="outline-success" onClick={() => setSearchNote('')}>
                        Clear Search
                      </Button>
                    </div>
                  ) : (
                    <div className="table-responsive">
                      <Table striped bordered hover className="mb-0">
                        <thead className="table-success">
                          <tr>
                            <th>#</th>
                            <th>Title</th>
                            <th>Content</th>
                            <th>Author</th>
                            <th>Created</th>
                            <th>Updated</th>
                          </tr>
                        </thead>
                        <tbody>
                          {filteredNotes.map((note, index) => (
                            <tr key={note._id}>
                              <td>{index + 1}</td>
                              <td><strong>{note.title || 'N/A'}</strong></td>
                              <td>
                                {note.content && note.content.length > 80
                                  ? `${note.content.substring(0, 80)}...`
                                  : note.content || 'N/A'}
                              </td>
                              <td>
                                <div>
                                  <strong>{note.user?.name || 'Unknown'}</strong>
                                  <br />
                                  <small className="text-muted">
                                    {note.user?.email || 'N/A'}
                                  </small>
                                </div>
                              </td>
                              <td>
                                {note.createdAt 
                                  ? new Date(note.createdAt).toLocaleString() 
                                  : 'N/A'}
                              </td>
                              <td>
                                {note.updatedAt 
                                  ? new Date(note.updatedAt).toLocaleString() 
                                  : 'N/A'}
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </Table>
                    </div>
                  )}
                </div>
              </Tab>
            </Tabs>
          </Card.Body>
        </Card>

      </Container>
    </>
  );
};

export default AdminPanel;
  