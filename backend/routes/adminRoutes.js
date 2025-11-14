import express from 'express';
import { adminOnly } from '../middleware/adminMiddleware.js';
import User from '../models/User.js';
import Note from '../models/Note.js';

const router = express.Router(); 

// Apply admin middleware to all routes in this router
// Use spread operator to apply all middleware functions
router.use(...adminOnly);

// @route   GET /api/admin/users
// @desc    Get all users (admin only)
// @access  Private/Admin
router.get('/users', async (req, res) => {
  try {
    const users = await User.find({}).select('-password').sort({ createdAt: -1 });
    
    res.status(200).json({
      success: true,
      count: users.length,
      data: users,
    });
  } catch (error) {
    console.error('Get users error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while fetching users',
      error: error.message,
    });
  }
});

// @route   GET /api/admin/notes
// @desc    Get all notes from all users (admin only)
// @access  Private/Admin
router.get('/notes', async (req, res) => {
  try {
    const notes = await Note.find({})
      .populate('user', 'name email')
      .sort({ updatedAt: -1 });
    
    res.status(200).json({
      success: true,
      count: notes.length,
      data: notes,
    });
  } catch (error) {
    console.error('Get all notes error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while fetching notes',
      error: error.message,
    });
  }
});

// @route   DELETE /api/admin/users/:id
// @desc    Delete a user (admin only)
// @access  Private/Admin
router.delete('/users/:id', async (req, res) => {
  try {
    const userId = req.params.id;

    // Prevent admin from deleting themselves
    if (userId === req.user._id.toString()) {
      return res.status(400).json({
        success: false,
        message: 'Cannot delete your own account',
      });
    }

    // Find user
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found',
      });
    }

    // Delete all notes belonging to this user
    await Note.deleteMany({ user: userId });

    // Delete user
    await User.findByIdAndDelete(userId);

    res.status(200).json({
      success: true,
      message: 'User and associated notes deleted successfully',
      data: {},
    });
  } catch (error) {
    console.error('Delete user error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while deleting user',
      error: error.message,
    });
  }
});

// @route   DELETE /api/admin/notes/:id
// @desc    Delete any note (admin only)
// @access  Private/Admin
router.delete('/notes/:id', async (req, res) => {
  try {
    const noteId = req.params.id;

    // Find note
    const note = await Note.findById(noteId);
    if (!note) {
      return res.status(404).json({
        success: false,
        message: 'Note not found',
      });
    }

    // Delete note
    await Note.findByIdAndDelete(noteId);

    res.status(200).json({
      success: true,
      message: 'Note deleted successfully',
      data: {},
    });
  } catch (error) {
    console.error('Delete note error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while deleting note',
      error: error.message,
    });
  }
});

// @route   PUT /api/admin/notes/:id
// @desc    Update any note (admin only)
// @access  Private/Admin
router.put('/notes/:id', async (req, res) => {
  try {
    const { title, content } = req.body;
    const noteId = req.params.id;

    if (!title || !content) {
      return res.status(400).json({
        success: false,
        message: 'Title and content are required',
      });
    }

    // Find note
    const note = await Note.findById(noteId);
    if (!note) {
      return res.status(404).json({
        success: false,
        message: 'Note not found',
      });
    }

    // Update note
    note.title = title;
    note.content = content;
    const updatedNote = await note.save();

    res.status(200).json({
      success: true,
      message: 'Note updated successfully',
      data: updatedNote,
    });
  } catch (error) {
    console.error('Update note error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while updating note',
      error: error.message,
    });
  }
});

export default router;

