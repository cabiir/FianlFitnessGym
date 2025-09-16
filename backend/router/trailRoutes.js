const express = require('express');
const router = express.Router();
const trailController = require('../controllers/trailController');
const upload = require('../middleware/uploadImage');

// Public routes
router.get('/', trailController.getAllTrails);
router.get('/:id', trailController.getTrail);
router.get('/images/:filename', trailController.serveImage);

// Protected routes (add authentication middleware as needed)
router.post('/', upload.single('image'), trailController.createTrail);
router.put('/:id', upload.single('image'), trailController.updateTrail);
router.delete('/:id', trailController.deleteTrail);

module.exports = router;