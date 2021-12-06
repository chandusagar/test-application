import express from 'express';
import { getUser,addUser,updateUser,getUserById,deleteUser,fileUpload } from '../controllers/UserController';
import { upload } from '../utilits/fileUpload';
import auth from '../middleware/auth';


const router = express.Router();

router.get('/', auth, getUser);
router.post('/signup', addUser);
router.get('/:id', getUserById);
router.put('/:id', updateUser);
router.delete('/:id', deleteUser);

router.post('/file', upload.single('profile'), fileUpload);



export {router as UserRouter}