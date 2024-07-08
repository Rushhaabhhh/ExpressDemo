const router = require('express').Router();
const productController = require('../controllers/productController');

router.get('/', productController.get);
router.get('/:id', productController.get);
router.put('/:id', productController.put);
router.post('', productController.post);
router.delete('/:id', productController.delete);

module.exports = router;



