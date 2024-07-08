const router = require('express').Router();
const userController = require('../controllers/userController');

router.get('/', userController.get);
router.get('/:id', userController.get);
router.put('/:id', userController.put);
router.post('/', userController.post);
router.delete('/:id', userController.delete);

module.exports = router;



