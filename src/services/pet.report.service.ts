import { injectable } from "tsyringe";
import { PetReportRepository } from "../repositories/pet.report.repositories";
import { IPetResponse, IReportPetCreate, IReportPetResponse, IReportPetUpdate } from "../types/types";
import cloudinary from "../config/cloudinary.config";

@injectable()
export class PetReportService {

  constructor(private petReportRepository: PetReportRepository) { }

  //Respuesta para las mascotas
  private toPetReportResponse(pet: any): IReportPetResponse {
    return {
      _id: pet._id.toString(),
      namePet: pet.namePet,
      tipoPet: pet.tipoPet,
      breed: pet.breed,
      age: pet.age,
      sex: pet.sex,
      size: pet.size,
      descriptionPet: pet.descriptionPet,
      address: pet.address,
      date: pet.date,
      photo: pet.photo,
      numberContact: pet.numberContact,
      user: pet.user,
      tipeReport: pet.tipeReport,
      status: pet.status || false,
      userId: pet.userId
    }
  }
  private async uploadImageToCloudinary(buffer: Buffer): Promise<string> {
    return new Promise((resolve, reject) => {
      cloudinary.uploader.upload_stream(
        {
          folder: 'petpal',
          resource_type: 'image',
        },
        (error, result) => {
          if (error) {
            reject(error);
          } else {
            resolve(result?.secure_url || '');
          }
        }
      ).end(buffer);
    });
  }
  //servicio para crear una mascota
  async serviceCreatePetReport(data: IReportPetCreate, photoBuffer?: Buffer): Promise<IReportPetResponse> {
    try {
      let photoUrl = '';
      //si hay una imagen, subirla a cloudinary
      if (photoBuffer) {
        photoUrl = await this.uploadImageToCloudinary(photoBuffer);
      }
      //creamos el reporte de la mascota con la URK de la imagen
      const petReportData = { ...data, photo: photoUrl };
      //guardamos la mascota 
      const petSave = await this.petReportRepository.createPetReport(petReportData)

      return this.toPetReportResponse(petSave);
    } catch (error) {
      throw error; // ← Lanzar el error original, no uno genérico
    }
  }
  //servicio para obtener todas los reportes
  async serviceGetPetsReportAll(): Promise<IReportPetResponse[]> {
    try {
      //obtenemos todas las reportes
      const reports = await this.petReportRepository.getPetReportAll();

      //convertimos los reportes a la respuesta que creamos
      return reports.map(report => this.toPetReportResponse(report))
    } catch (error) {
      throw new Error("Error al obtener los reportes de mascotas");
    }
  }
  //servicio para obtener un reporte por id
  async serviceGetPetReportById(id: string): Promise<IReportPetResponse | null> {

    try {
      //bucamos el reporte por el id
      const reportById = await this.petReportRepository.getAllPetReportsByUserId(id);
      //verificamos que el id exista 
      if (!reportById) {
        throw new Error('No se encontro el reporte por el id');
      }
      //si todo esta okey devolvemos el reporte
      return this.toPetReportResponse(reportById);
    } catch (error) {
      throw new Error("Error al obtener el reporte de mascota por id");
    }
  }
  //servicio para actualizar un reporte
  async servicteUpdatePetReport(id: string, data: IReportPetUpdate, photoBuffer?: Buffer): Promise<IReportPetResponse | null> {
    try {
      let updateDate = { ...data };

      //si hay una imagen nueva la subimos a cloudinary
      if (photoBuffer) {
        const photoUrl = await this.uploadImageToCloudinary(photoBuffer);
        //pasamos la foto nueva en caso de que exista
        updateDate.photo = photoUrl;
      }
      //ahora actualizamos los edmas datos si es necesario
      const updateReport = await this.petReportRepository.updatePetReport(id, data);
      if (!updateReport) {
        throw new Error("Reporte no encontrado");
      }
      //retoranamos la respuesta igual
      return this.toPetReportResponse(updateReport);
    } catch (error) {
      throw new Error("Error al actualizar el reporte de mascota");
    }
  }
  //servicio para eliminar una mascota
  async serviceReportDelete(id: string): Promise<IReportPetResponse | null> {
    try {
      //eliminamos la mascota en el repositorio
      const deleteReport = await this.petReportRepository.deletePetReport(id);
      //verificamos que exista el reporte
      if (!deleteReport) {
        throw new Error('No se encontro el reporte para eliminar')
      }

      //si existe devolvemos con la respuesta que tenemos creada
      return await this.toPetReportResponse(deleteReport);
    } catch (error) {
      throw new Error("Error al eliminar el reporte de mascota");
    }
  }
  //servicio para buscar todos los reportes que hizo un usuarip
 async serviceReporteGetAllUserById(userId: string): Promise<IReportPetResponse[]> {
  try {
    console.log('id en el servicio', userId);
    
    // Obtenemos todos los reportes
    const getAllReports = await this.petReportRepository.getAllPetReportsByUserId(userId);
    console.log("🚀 ~ PetReportService ~ serviceReporteGetAllUserById ~ getAllReports:", getAllReports);
    
    // CORRECCIÓN: Verificamos que el array tenga elementos
    if (!getAllReports || getAllReports.length === 0) {
      throw new Error("No se encontraron reportes para este usuario");
    }
    
    // Si los reportes existen, devolvemos con las respuestas que tenemos creadas
    return getAllReports.map(report => this.toPetReportResponse(report));
  } catch (error) {
    // Re-lanzamos el error para que sea manejado por el controlador
    throw error;
  }
}
}