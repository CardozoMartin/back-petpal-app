import { Router } from "express";
import { UserControllers } from "../controllers/user.controllers";
import { DependencyFactory } from "../factories/user.factory";

const router: Router = Router();
const userController = DependencyFactory.getUserController();

//ruta para registrar un usuario
router.post('/register', userController.postUser.bind(userController));


//rutas para verificar el token de verificación del usuario
router.get('/verify/:token', userController.verifyAccount.bind(userController));

export default router;