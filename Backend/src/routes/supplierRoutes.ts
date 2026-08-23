import { Router } from 'express'
import { createSupplier, getSuppliers } from '../controllers/supplierController.js'
import authenticateToken from '../middlewares/authenticateToken.js'

const router = Router()


router.get('/suppliers' , authenticateToken ,getSuppliers)
router.post('/suppliers', authenticateToken, createSupplier)

export default router