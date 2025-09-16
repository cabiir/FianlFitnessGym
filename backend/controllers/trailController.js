const Trail = require('../models/Trail');
const fs = require('fs');
const path = require('path');

// Get all trails
exports.getAllTrails = async (req, res) => {
  try {
    const { category } = req.query;
    let filter = {};
    
    if (category && category !== 'all') {
      filter.category = category;
    }

    const trails = await Trail.find(filter).sort({ createdAt: -1 });
    res.json({
      success: true,
      data: trails,
      count: trails.length
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server Error',
      error: error.message
    });
  }
};

// Get single trail
exports.getTrail = async (req, res) => {
  try {
    const trail = await Trail.findById(req.params.id);
    
    if (!trail) {
      return res.status(404).json({
        success: false,
        message: 'Trail not found'
      });
    }

    res.json({
      success: true,
      data: trail
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server Error',
      error: error.message
    });
  }
};

// Create new trail
exports.createTrail = async (req, res) => {
  try {
    const { title, category, duration, intensity, description } = req.body;
    
    // Check if image was uploaded
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: 'Image is required'
      });
    }

    const trailData = {
      title,
      category,
      duration,
      intensity,
      description,
      image: req.file.filename // Store only the filename
    };

    const trail = await Trail.create(trailData);
    
    res.status(201).json({
      success: true,
      message: 'Trail created successfully',
      data: trail
    });
  } catch (error) {
    // Clean up uploaded file if error occurs
    if (req.file) {
      fs.unlinkSync(req.file.path);
    }
    
    res.status(500).json({
      success: false,
      message: 'Server Error',
      error: error.message
    });
  }
};

// Update trail
exports.updateTrail = async (req, res) => {
  try {
    const { title, category, duration, intensity, description } = req.body;
    const trailId = req.params.id;

    // Find existing trail
    const existingTrail = await Trail.findById(trailId);
    if (!existingTrail) {
      return res.status(404).json({
        success: false,
        message: 'Trail not found'
      });
    }

    const updateData = {
      title,
      category,
      duration,
      intensity,
      description
    };

    // If new image is uploaded, update image and delete old one
    if (req.file) {
      // Delete old image
      if (existingTrail.image) {
        const oldImagePath = path.join('uploads/images', existingTrail.image);
        if (fs.existsSync(oldImagePath)) {
          fs.unlinkSync(oldImagePath);
        }
      }
      updateData.image = req.file.filename;
    }

    const updatedTrail = await Trail.findByIdAndUpdate(
      trailId,
      updateData,
      { new: true, runValidators: true }
    );

    res.json({
      success: true,
      message: 'Trail updated successfully',
      data: updatedTrail
    });
  } catch (error) {
    // Clean up uploaded file if error occurs
    if (req.file) {
      fs.unlinkSync(req.file.path);
    }
    
    res.status(500).json({
      success: false,
      message: 'Server Error',
      error: error.message
    });
  }
};

// Delete trail
exports.deleteTrail = async (req, res) => {
  try {
    const trail = await Trail.findById(req.params.id);
    
    if (!trail) {
      return res.status(404).json({
        success: false,
        message: 'Trail not found'
      });
    }

    // Delete associated image
    if (trail.image) {
      const imagePath = path.join('uploads/images', trail.image);
      if (fs.existsSync(imagePath)) {
        fs.unlinkSync(imagePath);
      }
    }

    await Trail.findByIdAndDelete(req.params.id);

    res.json({
      success: true,
      message: 'Trail deleted successfully'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server Error',
      error: error.message
    });
  }
};

// Serve images
exports.serveImage = (req, res) => {
  try {
    const filename = req.params.filename;
    const imagePath = path.join(__dirname, '../uploads/images', filename);
    
    if (fs.existsSync(imagePath)) {
      res.sendFile(imagePath);
    } else {
      res.status(404).json({
        success: false,
        message: 'Image not found'
      });
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server Error',
      error: error.message
    });
  }
};