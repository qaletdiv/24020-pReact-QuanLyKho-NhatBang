import { Router } from 'express'
import { getProducts, createProduct, getProductSizes, getProductById, updateProduct, createProductSize } from '../controllers/productController.js'
import authenticateToken  from '../middlewares/authenticateToken.js'

const router = Router()

router.get("/products", authenticateToken,getProducts);
router.get("/products/sizes", authenticateToken, getProductSizes);
router.get("/products/:id", authenticateToken, getProductById);
router.post("/products", authenticateToken, createProduct);
router.put("/products/:id", authenticateToken, updateProduct);
router.post('/sizes', authenticateToken ,createProductSize);

export default router