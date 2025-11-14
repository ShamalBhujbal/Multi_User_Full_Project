import express from 'express';
import { body, validationResult } from 'express-validator';
import { protect } from '../middleware/authMiddleware.js';
import Note from '../models/Note.js';

const router = express.Router();

// All routes require authentication
router.use(protect);

// @route   GET /api/notes
// @desc    Get all notes for logged-in user
// @access  Private
router.get('/', async (req, res) => {
  try {
    const notes = await Note.find({ user: req.user._id }).sort({ updatedAt: -1 });

    res.status(200).json({
      success: true,
      count: notes.length,
      data: notes,
    });
  } catch (error) {
    console.error('Get notes error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while fetching notes',
      error: error.message,
    });
  }
});

// @route   POST /api/notes
// @desc    Create a new note
// @access  Private
router.post(
  '/',
  [
    body('title').trim().notEmpty().withMessage('Title is required'),
    body('content').trim().notEmpty().withMessage('Content is required'),
  ],
  async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({
          success: false,
          message: 'Validation failed',
          errors: errors.array(),
        });
      }

      const { title, content } = req.body;

      const note = await Note.create({
        title,
        content,
        user: req.user._id,
      });

      res.status(201).json({
        success: true,
        message: 'Note created successfully',
        data: note,
      });
    } catch (error) {
      console.error('Create note error:', error);
      res.status(500).json({
        success: false,
        message: 'Server error while creating note',
        error: error.message,
      });
    }
  }
);

// @route   PUT /api/notes/:id
// @desc    Update a note
// @access  Private
router.put(
  '/:id',
  [
    body('title').trim().notEmpty().withMessage('Title is required'),
    body('content').trim().notEmpty().withMessage('Content is required'),
  ],
  async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({
          success: false,
          message: 'Validation failed',
          errors: errors.array(),
        });
      }

      const { title, content } = req.body;
      const noteId = req.params.id;

      // Find note and verify ownership
      const note = await Note.findById(noteId);

      if (!note) {
        return res.status(404).json({
          success: false,
          message: 'Note not found',
        });
      }

      // Check if note belongs to the logged-in user
      if (note.user.toString() !== req.user._id.toString()) {
        return res.status(403).json({
          success: false,
          message: 'Not authorized to update this note',
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
  }
);

// @route   DELETE /api/notes/:id
// @desc    Delete a note
// @access  Private
router.delete('/:id', async (req, res) => {
  try {
    const noteId = req.params.id;

    // Find note and verify ownership
    const note = await Note.findById(noteId);

    if (!note) {
      return res.status(404).json({
        success: false,
        message: 'Note not found',
      });
    }

    // Check if note belongs to the logged-in user
    if (note.user.toString() !== req.user._id.toString()) {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to delete this note',
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

export default router;

