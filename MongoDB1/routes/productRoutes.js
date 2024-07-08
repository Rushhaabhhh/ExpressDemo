const router = require('express').Router();
const productController = require('../controllers/productController');

router.get('/products', productController.get);
router.get('/products/:id', productController.get);
router.put('/products/:id', productController.put);
router.post('/products', productController.post);
router.delete('/products/:id', productController.delete);

module.exports = router;



