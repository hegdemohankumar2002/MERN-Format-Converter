const express = require('express');
const router = express.Router();
const contactController = require('../controllers/contactController');
const authMiddleware = require('../middleware/auth');
const adminAuth = require('../middleware/admin');

// Public routes
router.post('/submit', contactController.submitContact);
router.get('/check-status', contactController.checkContactStatus);

// Admin routes - require admin authentication
router.get('/admin', adminAuth, contactController.getAllContacts);
router.get('/admin/stats', adminAuth, contactController.getContactStats);
router.get('/admin/:id', adminAuth, contactController.getContactById);
router.put('/admin/:id/status', adminAuth, contactController.updateContactStatus);
router.post('/admin/:id/reply', adminAuth, contactController.replyToContact);
router.delete('/admin/:id', adminAuth, contactController.deleteContact);

module.exports = router; 