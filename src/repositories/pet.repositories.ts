import { injectable } from "tsyringe";

import Pet, { IPet } from "../models/pet.model";
import { IPetCreate, IPetUpdate } from "../types/types";
import { IPetInterface } from "../interface/pet.interface";


@injectable()
export class PetRepository implements IPetInterface {
  //repository para obtener todas las mascotas
  async getPetAll(): Promise<IPet[]> {
    try {
      const pets = await Pet.find();
      return pets;
    } catch (error) {
      throw new Error("Error al obtener las mascotas");
    }
  }
  //repository para obtener una mascota por id
  async getPetById(id: string): Promise<IPet | null> {
    try {
      const pet = await Pet.findById(id);
      return pet;
    } catch (error) {
      throw new Error("Error al obtener la mascota");
    }
  }
  //repository para obtener todas las mascotas de un usuario por id
  async getAllPetsByUserId(userId: string): Promise<IPet[]> {
    try {
      const pets = await Pet.find({ idUser: userId });
      return pets;
    } catch (error) {
      throw new Error("Error al obtener las mascotas del usuario");
    }
  }
  //repository para crear una mascota
  async createPet(dataPet: IPetCreate): Promise<IPet> {
    try {
      const pet = new Pet(dataPet);
      await pet.save();
      return pet;
    } catch (error) {
      throw new Error("Error al crear la mascota");
    }
  }
  //repository para actualizar una mascota
  async updatePet(id: string, dataPet: IPetUpdate): Promise<IPet | null> {
    try {
      const updatedPet = await Pet.findByIdAndUpdate(id, dataPet, { new: true });
      return updatedPet;
    } catch (error) {
      throw new Error("Error al actualizar la mascota");
    }
  }
  //repository para eliminar una mascota
  async deletePet(id: string): Promise<IPet | null> {
    try {
      const deletedPet = await Pet.findByIdAndDelete(id);
      if (!deletedPet) {
        throw new Error("Mascota no encontrada");
      }
      return deletedPet;
    } catch (error) {
      throw new Error("Error al eliminar la mascota");
    }
  }
}
