const express = require('express')
const router = express.Router()
const { createProject, getAllProjects, updateProject, deleteProject } = require('../controllers/project')
const { protect } = require('../middlewares/protect')
const upload = require('../middlewares/fileupload')

router.route('/create').post(upload.single("uploadImage"), protect, createProject)
router.route('/edit').put(upload.single("uploadImage"), protect, updateProject)
router.route('/:id').get(protect, getAllProjects).delete(protect, deleteProject)

module.exports = router


