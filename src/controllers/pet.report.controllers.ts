import { injectable } from "tsyringe";
import { PetReportService } from "../services/pet.report.service";
import { IErrorResponse, IReportPetCreate, IReportPetResponse, ISuccessResponse } from "../types/types";
import { Request, } from "express";

@injectable()
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
  const { userId } = req.params;
  console.log(userId);
  
  try {
    // Obtenemos todos los reportes de un usuario por id
    const reportForByUserId = await this.reportPetSerivce.serviceReporteGetAllUserById(userId);
    
    console.log(reportForByUserId);
    
    const successResponse: ISuccessResponse<IReportPetResponse[]> = {
      success: true,
      data: reportForByUserId,
      timestamp: new Date()
    };
    
    return res.status(200).json(successResponse);
    
  } catch (error) {
    // Manejo de diferentes tipos de errores
    if (error.message === "No se encontraron reportes para este usuario") {
      const errorResponse: IErrorResponse = {
        success: false,
        error: "No se encontraron reportes para este usuario",
        timestamp: new Date()
      };
      return res.status(404).json(errorResponse);
    }
    
    // Error genérico del servidor
    const errorResponse: IErrorResponse = {
      success: false,
      error: "Error al obtener los reportes de mascotas",
      timestamp: new Date()
    };
    return res.status(500).json(errorResponse);
  }
}

  //controlador para crear un reporte
 async postReportPet(req: Request, res: Response): Promise<Response> {
  try {
    console.log("🚀 ~ ReportPetController ~ postReportPet ~ req.body:", req.body);
    console.log("🚀 ~ ReportPetController ~ postReportPet ~ req.file:", req.file);

    // ✅ Parsear el campo user si viene como string JSON
    let userData;
    if (typeof req.body.user === 'string') {
      try {
        userData = JSON.parse(req.body.user);
      } catch (parseError) {
        console.error('Error parsing user data:', parseError);
        const errorResponse: IErrorResponse = {
          success: false,
          error: 'Formato de datos de usuario inválido',
          timestamp: new Date()
        };
        return res.status(400).json(errorResponse);
      }
    } else {
      userData = req.body.user;
    }

    // ✅ Validar que userData sea un array
    if (!Array.isArray(userData)) {
      const errorResponse: IErrorResponse = {
        success: false,
        error: 'Los datos de usuario deben ser un array',
        timestamp: new Date()
      };
      return res.status(400).json(errorResponse);
    }

    // ✅ Construir el objeto reportData con los tipos correctos
    const reportData: IReportPetCreate = {
      tipeReport: req.body.tipeReport,
      namePet: req.body.namePet,
      tipoPet: req.body.tipoPet,
      breed: req.body.breed,
      age: parseInt(req.body.age, 10), // ✅ Asegurar que sea número
      sex: req.body.sex,
      size: req.body.size,
      address: req.body.address,
      descriptionPet: req.body.descriptionPet,
      numberContact: req.body.numberContact,
      photo: req.file ? req.file.filename : req.body.photo, // ✅ Usar filename si hay archivo
      user: userData, // ✅ Ahora es un array parseado correctamente
      status: false,
      userId: req.body.userId
    };

    // ✅ Solo agregar date si no es "Mascota en Adopción" y existe
    if (req.body.tipeReport !== 'Mascota en Adopción' && req.body.date) {
      reportData.date = req.body.date;
    }

    console.log("🚀 ~ ReportPetController ~ postReportPet ~ reportData:", reportData);

    const photoBuffer = req.file?.buffer;
    const report = await this.reportPetSerivce.serviceCreatePetReport(reportData, photoBuffer);

    // Si todo sale bien
    const successResponse: ISuccessResponse<IReportPetResponse> = {
      success: true,
      data: report,
      timestamp: new Date()
    };
    return res.status(201).json(successResponse);

  } catch (error) {
    console.error("❌ Error completo:", error);

    // ✅ Manejar diferentes tipos de errores
    let errorMessage = "Error al crear el reporte de mascota";
    let statusCode = 500;

    // Error de validación de Mongoose
    if (error.name === 'ValidationError') {
      errorMessage = `Error de validación: ${Object.values(error.errors).map((err: any) => err.message).join(', ')}`;
      statusCode = 400;
    }
    // Error de casteo de Mongoose (como el que tienes)
    else if (error.name === 'CastError') {
      errorMessage = `Error de formato de datos: ${error.message}`;
      statusCode = 400;
    }
    // Error personalizado del servicio
    else if (error.message) {
      errorMessage = error.message;
      // Si el error viene del servicio, podría ser 400
      if (error.message.includes('validación') || error.message.includes('formato')) {
        statusCode = 400;
      }
    }

    const errorResponse: IErrorResponse = {
      success: false,
      error: errorMessage,
      timestamp: new Date()
    };
    return res.status(statusCode).json(errorResponse);
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