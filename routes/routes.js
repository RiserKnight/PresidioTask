const { Router } = require('express');
const management = require('../controllers/management');

const router = Router();

router.get('/',management.home);
router.get('/students',management.students);
router.get('/update',management.updates);
router.post('/add',management.add);
router.post('/updateStudent',management.updateStudent);

module.exports = router;