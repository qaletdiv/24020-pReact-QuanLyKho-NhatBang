import express ,{type Express} from 'express'
import {postRegister} from '../controllers/authController.js'
const router = express.Router() ;

router.post('/register' ,postRegister) ;
 
export default router ;