import 'reflect-metadata';
import Router from 'express';
import { container } from 'tsyringe';
import { PetControllers } from '../controllers/pet.controllers';
import validacionMiddleware from '../middlewares/validate.schema';
import postPetSchema from '../utils/postPetSchema';
import upload from '../config/image.multer';

const router:Router = Router();
const petController = container.resolve(PetControllers);


  // Ruta para obtener todas las mascotas
  router.get('/', petController.getPetAll.bind(petController));

  // Ruta para obtener todas las mascotas de un usuario por ID
  router.get('/user/:userId', petController.getAllPetsByUserId.bind(petController));

  // Ruta para obtener una mascota por ID
  router.get('/:id', petController.getPetById.bind(petController));

  // Ruta para crear una mascota
  router.post('/', validacionMiddleware.validacionSchema(postPetSchema), upload.single('photo'),
   petController.createPet.bind(petController));

  // Ruta para actualizar una mascota
  router.put('/:id', upload.single('photo'), petController.updatePet.bind(petController));

  // Ruta para eliminar una mascota
  router.delete('/:id', petController.deletePet.bind(petController));



export default router;