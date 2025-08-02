import { injectable } from "tsyringe";
import { PetRepository } from "../repositories/pet.repositories";
import { IPetCreate, IPetResponse, IPetUpdate } from "../types/types";
import cloudinary from "../config/cloudinary.config";


@injectable()
export class PetService {

  constructor(private petRepository: PetRepository) { }
  private toPetResponse(pet: any): IPetResponse {
    return {
      _id: pet._id.toString(),
      name: pet.name,
      tipo: pet.tipo,
      breed: pet.breed,
      age: pet.age,
      address: pet.address,
      phone: pet.phone,
      photo: pet.photo,
      idUser: pet.idUser.toString()
    };
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
  //servicio para obtener todas las mascotas
  async serviceGetPetAll(): Promise<IPetResponse[]> {
    try {
      //obtenemos todas las mascotas del repositorio
      const pets = await this.petRepository.getPetAll();
      //convertimos las mascotas a la respuesta esperada
      return pets.map(pet => this.toPetResponse(pet));
    } catch (error) {
      throw new Error("Error al obtener las mascotas");
    }
  }
  //servicio para obtener mascotas por id
  async serviceGetPetById(id: string): Promise<IPetResponse | null> {
    try {
      //obtenemos la mascota por id del repositorio
      const pet = await this.petRepository.getPetById(id);
      if (!pet) {
        throw new Error("Mascota no encontrada");
      }
      //convertimos la mascota a la respuesta esperada
      return this.toPetResponse(pet);
    } catch (error) {
      throw new Error("Error al obtener la mascota por id");
    }
  }
  //servicio para obtener todas las mascotas de un usuario por id
  async serviceGetAllPetsByUserId(userId: string): Promise<IPetResponse[]> {
    try {
      //obtenemos todas las mascotas del usuario por id del repositorio
      const pets = await this.petRepository.getAllPetsByUserId(userId);
      //convertimos las mascotas a la respuesta esperada
      return pets.map(pet => this.toPetResponse(pet));
    } catch (error) {
      throw new Error("Error al obtener las mascotas del usuario");
    }
  }
  //servicio para crear una mascota
  async serviceCreatePet(dataPet: IPetCreate, photoBuffer?: Buffer): Promise<IPetResponse> {
    try {
      let photoUrl = '';
      
      // Si hay una imagen, subirla a Cloudinary
      if (photoBuffer) {
        photoUrl = await this.uploadImageToCloudinary(photoBuffer);
      }

      // Crear la mascota con la URL de la imagen
      const petData = { ...dataPet, photo: photoUrl };
      const pet = await this.petRepository.createPet(petData);
      
      return this.toPetResponse(pet);
    } catch (error) {
      throw new Error("Error al crear la mascota");
    }
  }
  //servicio para actualizar una mascota
  async serviceUpdatePet(id: string, dataPet: IPetUpdate, photoBuffer?: Buffer): Promise<IPetResponse | null> {
    try {
      let updateData = { ...dataPet };
      
      // Si hay una nueva imagen, subirla a Cloudinary
      if (photoBuffer) {
        const photoUrl = await this.uploadImageToCloudinary(photoBuffer);
        updateData.photo = photoUrl;
      }

      const updatedPet = await this.petRepository.updatePet(id, updateData);
      if (!updatedPet) {
        throw new Error("Mascota no encontrada");
      }
      
      return this.toPetResponse(updatedPet);
    } catch (error) {
      throw new Error("Error al actualizar la mascota");
    }
  }
  //servicio para eliminar una mascota
  async serviceDeletePet(id: string): Promise<IPetResponse | null> {
    try {
      //eliminamos la mascota en el repositorio
      const deletedPet = await this.petRepository.deletePet(id);
      if (!deletedPet) {
        throw new Error("Mascota no encontrada");
      }
      //convertimos la mascota a la respuesta esperada
      return this.toPetResponse(deletedPet);
    } catch (error) {
      throw new Error("Error al eliminar la mascota");
    }
  }
}
