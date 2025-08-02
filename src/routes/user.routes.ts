import 'reflect-metadata';
import { container } from "tsyringe";
import { Router } from "express";
import { UserControllers } from "../controllers/user.controllers";
import validacionMiddleware from "../middlewares/validate.schema";
import { postUserSchema } from "../utils/postUserSchema";

const router: Router = Router();
const userController = container.resolve(UserControllers);

//ruta para registrar un usuario
router.post('/register', validacionMiddleware.validacionSchema(postUserSchema), userController.postUser.bind(userController));

//rutas para obtener usuarios
router.get('/', userController.getUsers.bind(userController));
router.get('/:id', userController.UserGetById.bind(userController));


//rutas para verificar el token de verificación del usuario
router.get('/verify/:token', userController.verifyAccount.bind(userController));


//ruta para actualizar un usuario
router.put('/:id', userController.putUser.bind(userController));

//ruta para eliminar un usuario
router.delete('/:id', userController.deleteUser.bind(userController));

export default router;