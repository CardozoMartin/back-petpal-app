import 'reflect-metadata'
import { container } from "tsyringe";
import Router from 'express';
import { ReportPetController } from "../controllers/pet.report.controllers";
import upload from '../config/image.multer';
import validacionMiddleware from '../middlewares/validate.schema';
import postPetReportSchema from '../utils/postPetReportSchema';

const router: Router = Router();
const reportController = container.resolve(ReportPetController);

// Rutas para obtener datos
router.get('/', reportController.getAllPetReports.bind(reportController));
router.get('/user/:userId', reportController.getPetReportByIdForUser.bind(reportController));
router.get('/:id', reportController.getPetReportById.bind(reportController));

// Rutas para crear un reporte
router.post('/create/', 
  upload.single('photo'),
  reportController.postReportPet.bind(reportController)
);

// Rutas para editar un reporte
router.put('/update/:id', reportController.putReportPet.bind(reportController));

// Rutas para eliminar un reporte
router.delete('/delete/:id', reportController.deletePetReport.bind(reportController));

export default router;