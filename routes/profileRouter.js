const express = require('express');
const router = express.Router();
const upload = require('../middlewares/multer');
const profileController = require('../controllers/profileController');
const methodNotAllowed = require('../utils/methodNotAllowed');

// Route to handle avatar upload
router.route('/upload-avatar')
  .post(upload.single('avatar'), profileController.uploadAvatar).all(methodNotAllowed)

// Route to get avatar URL
router.route('/:userId/avatar')
  .get(profileController.getAvatar).all(methodNotAllowed)

// Route to update avatar
router.route('/update-avatar')
  .put(upload.single('avatar'), profileController.updateAvatar).all(methodNotAllowed)

// Route to delete avatar
router.route('/delete-avatar')
  .delete(profileController.deleteAvatar).all(methodNotAllowed)

module.exports = router;
