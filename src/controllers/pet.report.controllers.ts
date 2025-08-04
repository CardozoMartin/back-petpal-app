import { injectable } from "tsyringe";
import { PetReportService } from "../services/pet.report.service";
import { IErrorResponse, IReportPetCreate, IReportPetResponse, ISuccessResponse } from "../types/types";
import { Request, } from "express";


export class ReportPetController {

  constructor(private reportPetSerivce: PetReportService) { }

  //controlador para obtener todos los reportes
  async getAllPetReports(req: Request, res: Response): Promise<Response> {

    try {
      //obtenemos todas los reportes publicados
      const petReports = await this.reportPetSerivce.serviceGetPetsReportAll();
      //si no hay reportes, retornar un error
      if (!petReports || petReports.length === 0) {
        const errorResponse: IErrorResponse = {
          success: false,
          error: 'No se encontraron reportes de mascotas',
          timestamp: new Date()
        };
        return res.status(404).json(errorResponse);
      }

      //si todo sale correcto 
      const successResponse: ISuccessResponse<IReportPetResponse[]> = {
        success: true,
        data: petReports,
        timestamp: new Date()
      }

      return res.status(200).json(successResponse);
    } catch (error) {
      const errorResponse: IErrorResponse = {
        success: false,
        error: 'Error al obtener los reportes de mascotas',
        timestamp: new Date()
      }
      return res.status(500).json(errorResponse);
    }
  }

  //controlador para obtener report por un id
  async getPetReportById(req: Request, res: Response): Promise<Response> {
    //obtenemos el id 
    const { userId } = req.params;
    try {
      //verificamos que el id exista
      const reportPet = await this.reportPetSerivce.serviceGetPetReportById(userId);
      if (!reportPet) {
        const errorResponse: IErrorResponse = {
          success: false,
          error: 'Reporte de mascota no encontrado',
          timestamp: new Date()
        };
        return res.status(404).json(errorResponse);
      }
      //si todo esta correcto 
      const successResponse: ISuccessResponse<IReportPetResponse> = {
        success: true,
        data: reportPet,
        timestamp: new Date()
      };
      return res.status(200).json(successResponse);
    } catch (error) {
      const errorResponse: IErrorResponse = {
        success: false,
        error: 'Error al obtener el reporte de mascota',
        timestamp: new Date()
      };
      return res.status(500).json(errorResponse);
    }

  }

  //controlador para obtener todos los report por un id de un usuario
  async getPetReportByIdForUser(req: Request, res: Response): Promise<Response> {
    const { userId } = req.params
    try {
      //obtenemos todos los reportes de un usuario por id
      const reportForByUserId = await this.reportPetSerivce.serviceReporteGetAllUserById(userId)
      if (!reportForByUserId) {
        const errorResponse: IErrorResponse = {
          success: false,
          error: "No se encontraron ningun reportes",
          timestamp: new Date()
        }
        res.status(404).json(errorResponse);
      }
      const successResponse: ISuccessResponse<IReportPetResponse[]> = {
        success: true,
        data: reportForByUserId,
        timestamp: new Date()
      }

      return res.status(200).json(successResponse)
    } catch (error) {
      const errorResponse: IErrorResponse = {
        success: false,
        error: "Error al obtener los reportes de mascotas",
        timestamp: new Date()
      }
      return res.status(500).json(errorResponse);
    }
  }

  //controlador para crear un reporte
  async postReportPet(req: Request, res: Response): Promise<Response> {
    //obtenemos los datos del body
    const reportData: IReportPetCreate = req.body
    //obtenemos la imange
    const photoBuffer = req.file?.buffer;

    try {
      //creamos el reporte
      const report = await this.reportPetSerivce.serviceCreatePetReport(reportData, photoBuffer)
      //si ocurre algun error
      if (!report) {
        const errorResponse: IErrorResponse = {
          success: false,
          error: "Error al crear el reporte de mascota",
          timestamp: new Date()
        };
        return res.status(500).json(errorResponse);
      }
      //sitodo sale bien
      const successResponse: ISuccessResponse<IReportPetResponse> = {
        success: true,
        data: report,
        timestamp: new Date()
      };
      return res.status(201).json(successResponse);
    } catch (error) {
      const errorResponse: IErrorResponse = {
        success: false,
        error: "Error al crear el reporte de mascota",
        timestamp: new Date()
      };
      return res.status(500).json(errorResponse);
    }
  }

  //controlador para ctualizar un reporte
  async putReportPet(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;
    const reportData: IReportPetCreate = req.body;
    const photoBuffer = req.file?.buffer;

    try {
      //actualizamos el reporte
      const updateReport = await this.reportPetSerivce.servicteUpdatePetReport(id, reportData, photoBuffer);
      if (!updateReport) {
        const errorResponse: IErrorResponse = {
          success: false,
          error: 'ocurrio un error',
          timestamp: new Date()
        }
        return res.status(404).json(errorResponse);
      }
      //si todo sale okey
      const succesResponse: ISuccessResponse<IReportPetResponse> = {
        success: true,
        data: updateReport,
        timestamp: new Date()
      }
      return res.status(201).json(succesResponse)
    } catch (error) {
      const errorResponse: IErrorResponse = {
        success: false,
        error: 'Error al actualizar el reporte de mascota',
        timestamp: new Date()
      };
      return res.status(500).json(errorResponse);
    }
  }
  //controlador para eliminar un reporte
  async deletePetReport(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;
    try {
      //eliminamos el reporte
      const deleteReport = await this.reportPetSerivce.serviceReportDelete(id);
      if (!deleteReport) {
        const errorResponse: IErrorResponse = {
          success: false,
          error: 'Reporte de mascota no encontrado',
          timestamp: new Date()
        };
        return res.status(404).json(errorResponse);
      }
      //si todo sale okey
      const successResponse: ISuccessResponse<IReportPetResponse> = {
        success: true,
        data: deleteReport,
        timestamp: new Date()
      };
      return res.status(200).json(successResponse);
    } catch (error) {
      const errorResponse: IErrorResponse = {
        success: false,
        error: 'Error al eliminar el reporte de mascota',
        timestamp: new Date()
      };
      return res.status(500).json(errorResponse);
    }
  }
}