
const express = require('express');

const { getAlladmins, createAdmin, updateAdmin, deletedAdmin } = require('../controller/Admincontroller');
const { adminProfile, adminHome } = require('../controller/adminProfile');
const adminLogin = require('../controller/authController');
const { getAllSingleStudents } = require('../controller/Students');
const authCheck = require('../middleware/authMiddleware');
const router = express.Router();

// Privet Route
router.route('/login').post(authCheck,adminLogin);
router.route('/profile').get(authCheck,adminProfile);
router.route('/home').get(authCheck,adminHome);



// Manage router
router.route('/').get(getAlladmins);
router.route('/:id').get(getAllSingleStudents);
router.route('/').post(createAdmin);
router.route('/:id').put(updateAdmin);
router.route('/:id').patch( updateAdmin );
router.route('/:id').delete( deletedAdmin )



module.exports = router;