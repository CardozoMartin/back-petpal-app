import { injectable } from "tsyringe";
import { PetService } from "../services/pet.service.s";
import { IErrorResponse, IPetCreate, IPetResponse, ISuccessResponse } from "../types/types";
import { Request, Response } from "express";


@injectable()
export class PetControllers {

  constructor(private petService: PetService) { }

  //controlador para obtener todas las mascotas
  async getPetAll(req: Request, res: Response): Promise<Response> {
    try {
      const pets = await this.petService.serviceGetPetAll();
      if (!pets || pets.length === 0) {
        const errorResponse: IErrorResponse = {
          success: false,
          error: 'No se encontraron mascotas',
          timestamp: new Date()
        };
        return res.status(404).json(errorResponse);
      }
      const successResponse: ISuccessResponse<IPetResponse[]> = {
        success: true,
        data: pets,
        timestamp: new Date()
      };
      return res.status(200).json(successResponse);
    } catch (error) {
      const errorResponse: IErrorResponse = {
        success: false,
        error: 'Error al obtener las mascotas',
        timestamp: new Date()
      };
      return res.status(500).json(errorResponse);
    }
  }
  //controlador para obtener una mascota por id
  async getPetById(req: Request, res: Response): Promise<Response> {
    try {
      const { id } = req.params;
      const pet = await this.petService.serviceGetPetById(id);
      if (!pet) {
        const errorResponse: IErrorResponse = {
          success: false,
          error: 'Mascota no encontrada',
          timestamp: new Date()
        };
        return res.status(404).json(errorResponse);
      }
      const successResponse: ISuccessResponse<IPetResponse> = {
        success: true,
        data: pet,
        timestamp: new Date()
      };
      return res.status(200).json(successResponse);
    } catch (error) {
      const errorResponse: IErrorResponse = {
        success: false,
        error: 'Error al obtener la mascota',
        timestamp: new Date()
      };
      return res.status(500).json(errorResponse);
    }
  }
  //controlador para obtener todas las mascotas de un usuario por id
  async getAllPetsByUserId(req: Request, res: Response): Promise<Response> {
    try {
      const { userId } = req.params;
      console.log(`Obteniendo mascotas para el usuario con ID: ${userId}`);
      const pets = await this.petService.serviceGetAllPetsByUserId(userId);
      if (!pets || pets.length === 0) {
        const errorResponse: IErrorResponse = {
          success: false,
          error: 'No se encontraron mascotas para este usuario',
          timestamp: new Date()
        };
        return res.status(404).json(errorResponse);
      }
      const successResponse: ISuccessResponse<IPetResponse[]> = {
        success: true,
        data: pets,
        timestamp: new Date()
      };
      return res.status(200).json(successResponse);
    } catch (error) {
      const errorResponse: IErrorResponse = {
        success: false,
        error: 'Error al obtener las mascotas del usuario',
        timestamp: new Date()
      };
      return res.status(500).json(errorResponse);
    }
  }
  //controlador para crear una mascota
  async createPet(req: Request, res: Response): Promise<Response> {
    try {
      const petData: IPetCreate = req.body;
      const photoBuffer = req.file?.buffer; 
      
      const newPet = await this.petService.serviceCreatePet(petData, photoBuffer);
      const successResponse: ISuccessResponse<IPetResponse> = {
        success: true,
        data: newPet,
        timestamp: new Date()
      };
      return res.status(201).json(successResponse);
    } catch (error) {
      const errorResponse: IErrorResponse = {
        success: false,
        error: 'Error al crear la mascota',
        timestamp: new Date()
      };
      return res.status(500).json(errorResponse);
    }
  }
  //controlador para acutalizar una mascota
  async updatePet(req: Request, res: Response): Promise<Response> {
    try {
      const { id } = req.params;
      const petData: IPetCreate = req.body;
      const photoBuffer = req.file?.buffer; // Obtener el buffer de la imagen desde multer
      
      const updatedPet = await this.petService.serviceUpdatePet(id, petData, photoBuffer);
      if (!updatedPet) {
        const errorResponse: IErrorResponse = {
          success: false,
          error: 'Mascota no encontrada',
          timestamp: new Date()
        };
        return res.status(404).json(errorResponse);
      }
      const successResponse: ISuccessResponse<IPetResponse> = {
        success: true,
        data: updatedPet,
        timestamp: new Date()
      };
      return res.status(200).json(successResponse);
    } catch (error) {
      const errorResponse: IErrorResponse = {
        success: false,
        error: 'Error al actualizar la mascota',
        timestamp: new Date()
      };
      return res.status(500).json(errorResponse);
    }
  }
  //controlador para eliminar una mascota
  async deletePet(req: Request, res: Response): Promise<Response> {
    try {
      const { id } = req.params;
      const deletedPet = await this.petService.serviceDeletePet(id);
      if (!deletedPet) {
        const errorResponse: IErrorResponse = {
          success: false,
          error: 'Mascota no encontrada',
          timestamp: new Date()
        };
        return res.status(404).json(errorResponse);
      }
      const successResponse: ISuccessResponse<IPetResponse> = {
        success: true,
        data: deletedPet,
        timestamp: new Date()
      };
      return res.status(200).json(successResponse);
    } catch (error) {
      const errorResponse: IErrorResponse = {
        success: false,
        error: 'Error al eliminar la mascota',
        timestamp: new Date()
      };
      return res.status(500).json(errorResponse);
    }
  }
}