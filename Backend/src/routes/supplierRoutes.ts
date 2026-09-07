import { Router } from 'express'
import { createSupplier, getSuppliers, getSupplierById, updateSupplier, deleteSupplier } from '../controllers/supplierController.js'
import authenticateToken, { authorizeRoles } from '../middlewares/authenticateToken.js'

const router = Router()


router.get('/suppliers', authenticateToken, getSuppliers)
router.get('/suppliers/:id', authenticateToken, getSupplierById)
router.post('/suppliers', authenticateToken,authorizeRoles('Admin'), createSupplier)
router.patch('/suppliers/:id', authenticateToken, authorizeRoles('Admin'), updateSupplier)
router.delete('/suppliers/:id', authenticateToken, authorizeRoles('Admin'), deleteSupplier)
export default router