import Router from 'express';

import { container } from 'tsyringe';
import { LoginControllers } from '../controllers/login.controllers';

const router: Router = Router();
const loginController = container.resolve(LoginControllers);


router.post('/login', loginController.postLogin.bind(loginController));


export default router;