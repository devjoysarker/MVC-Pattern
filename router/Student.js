
const express = require('express');

const { getAllStudents, getAllSingleStudents, CreateStudents, updateStudents, deleteStudents } = require('../controller/Students');
const router = express.Router();


// Manage router
router.route('/').get(getAllStudents);
router.route('/:id').get(getAllSingleStudents);
router.route('/').post(CreateStudents);
router.route('/:id').put( updateStudents )
router.route('/:id').patch( updateStudents )
router.route('/:id').patch( deleteStudents )


module.exports = router;