import express ,{type Express} from 'express'
import {postLogin, postRegister} from '../controllers/authController.js'
const router = express.Router() ;

router.post('/register' ,postRegister) ;
router.post('/login' , postLogin ) ;
export default router ;