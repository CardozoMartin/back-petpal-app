import { IPetReportDocument } from "../models/pet.reports.model";
import { IReportPetCreate, IReportPetUpdate } from "../types/types";


export interface PetReportInterface {
  getPetReportAll(): Promise<IPetReportDocument[]>;
  getPetReportById(id: string): Promise<IPetReportDocument | null>;
  getAllPetReportsByUserId(userId: string): Promise<IPetReportDocument[]>;
  createPetReport(dataPetReport: IReportPetCreate): Promise<IPetReportDocument>;
  updatePetReport(id: string, dataPetReport: IReportPetUpdate): Promise<IPetReportDocument | null>;
  deletePetReport(id: string): Promise<IPetReportDocument | null>;
}