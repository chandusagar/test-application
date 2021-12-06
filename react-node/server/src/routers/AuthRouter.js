import express from 'express';

import {Signin} from '../controllers/SigninController'

const router = express.Router();

router.post('/signin', Signin);


export {router as AuthRouter}