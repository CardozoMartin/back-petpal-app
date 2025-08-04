import 'reflect-metadata'
import { container } from "tsyringe";
import Router from 'express';
import { ReportPetController } from "../controllers/pet.report.controllers";

const router:Router = Router();
const reportController = container.resolve(ReportPetController)


//rutas para obtener datos
router.get('/', reportController.getAllPetReports.bind(reportController));
router.get('/user/:userId',reportController.getPetReportByIdForUser.bind(reportController))
router.get('/:id', reportController.getPetReportById.bind(reportController));
//rutas para crear un reporte
router.post('/create/', reportController.postReportPet.bind(reportController));
//rutas para editar un reprote
router.put('/update/:id', reportController.putReportPet.bind(reportController));
//rutas para eliminar un reporte
router.delete('/delete/:id', reportController.deletePetReport.bind(reportController));

export default router;