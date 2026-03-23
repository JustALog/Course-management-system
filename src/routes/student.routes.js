const express = require('express');
const studentController = require('../controllers/student.controller');
const { authenticate } = require('../middleware/auth.middleware');

const router = express.Router();

// All student routes require authentication
router.use(authenticate);

/**
 * GET /api/students
 */
router.get('/', studentController.getAll);

/**
 * GET /api/students/:id
 */
router.get('/:id', studentController.getById);

/**
 * PUT /api/students/:id
 */
router.put('/:id', studentController.update);

module.exports = router;
