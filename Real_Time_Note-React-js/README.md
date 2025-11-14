# Frontend Documentation

## Setup

1. Install dependencies: `npm install`
2. Start development server: `npm run dev`
3. The app will run on `http://localhost:3000`

## Project Structure

```
src/
├── components/
│   ├── Navbar.jsx          # Navigation bar with user info and logout
│   ├── AddNoteModal.jsx    # Modal for adding new notes
│   ├── EditNoteModal.jsx   # Modal for editing existing notes
│   └── DeleteNoteModal.jsx # Confirmation modal for deleting notes
├── pages/
│   ├── Signup.jsx          # User registration page
│   ├── Login.jsx           # User login page
│   └── Dashboard.jsx       # Main notes dashboard
├── context/
│   └── AuthContext.jsx     # Authentication context provider
├── App.jsx                  # Main app component with routing
└── main.jsx                 # Entry point
```

## Features

### Authentication
- Signup page with name, email, and password
- Login page with email and password
- JWT token stored in localStorage
- Protected routes that require authentication
- Automatic redirection if not authenticated

### Dashboard
- Displays all user's notes in a responsive grid
- Empty state when no notes exist
- Add Note button opens modal
- Edit Note button opens modal with prefilled data
- Delete Note button opens confirmation modal
- Success alerts for all operations:
  - ✅ "Note added successfully!"
  - ✅ "Note updated successfully!"
  - 🗑️ "Note deleted successfully!"

### Navbar
- Shows app name
- Displays user's name or email in dropdown
- Logout button that clears token and redirects to login

### Responsive Design
- Built with React Bootstrap
- Mobile-friendly grid layout
- Responsive modals and forms
- Works on all screen sizes

## API Integration

The frontend uses Axios to communicate with the backend API. All API calls include JWT token in the Authorization header automatically.

### API Base URL
Configured in `vite.config.js` to proxy `/api` requests to `http://localhost:5000`

## State Management

- **AuthContext**: Manages user authentication state and provides login, signup, and logout functions
- **Local State**: Each component manages its own local state for forms and UI

## Routing

- `/signup` - Signup page (public)
- `/login` - Login page (public)
- `/dashboard` - Notes dashboard (protected)
- `/` - Redirects to dashboard

## Build for Production

```bash
npm run build
```

This will create an optimized production build in the `dist` directory.

## Preview Production Build

```bash
npm run preview
```

