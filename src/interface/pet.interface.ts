import { IPet } from "../models/pet.model";
import { IPetCreate, IPetUpdate } from "../types/types";


export interface IPetInterface {
  getPetAll(): Promise<IPet[]>;
  getPetById(id: string): Promise<IPet | null>;
  getAllPetsByUserId(userId: string): Promise<IPet[]>;
  createPet(dataPet: IPetCreate): Promise<IPet>;
  updatePet(id:string, dataPet: IPetUpdate): Promise<IPet | null>;
  deletePet(id: string): Promise<IPet | null>;
}