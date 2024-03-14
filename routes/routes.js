const { Router } = require('express');
const management = require('../controllers/management');

const router = Router();

router.get('/',management.home);
router.get('/students',management.students);

router.get('/update',management.updates);
router.post('/add',management.add);
router.post('/updateStudent',management.updateStudent);
router.post('/addStudentMarks',management.updateStudentMarks);

router.get('/delete',management.deleteStudent);
router.post('/delete',management.deleteStudentRecord);

router.get('/search',management.deleteStudent);

module.exports = router;