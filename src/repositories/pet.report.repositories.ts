import { injectable } from "tsyringe";
import { PetReportInterface } from "../interface/pet.report.interface";
import PetReportModel, { IPetReportDocument } from "../models/pet.reports.model";
import { IReportPetCreate, IReportPetUpdate } from "../types/types";



@injectable()
export class PetReportRepository implements PetReportInterface {

  //repository para obtener todos los reportes de mascotas
  async getPetReportAll(): Promise<IPetReportDocument[]> {
    try {
      const reports = await PetReportModel.find();
      return reports;
    } catch (error) {
      throw new Error("Error al obtener los reportes de mascotas");
    }
  }

  //repository para obtener un reporte de mascota por id
  async getPetReportById(id: string): Promise<IPetReportDocument | null> {
    try {
      const report = await PetReportModel.findById(id);
      return report;
    } catch (error) {
      throw new Error("Error al obtener el reporte de mascota");
    }
  }

  //repository para obtener todos los reportes de mascotas por id de usuario
  async getAllPetReportsByUserId(userId: string): Promise<IPetReportDocument[]> {
    try {
      const reports = await PetReportModel.find({ userId });
      return reports;
    } catch (error) {
      throw new Error("Error al obtener los reportes de mascotas del usuario");
    }
  }

  //repository para crear un reporte de mascota
  async createPetReport(dataPetReport: IReportPetCreate): Promise<IPetReportDocument> {
    try {
      const report = new PetReportModel(dataPetReport);
      await report.save();
      return report;
    } catch (error) {
      throw error; // ← Lanzar el error original, no uno genérico
    }
  }

  //repository para actualizar un reporte de mascota
  async updatePetReport(id: string, dataPetReport: IReportPetUpdate): Promise<IPetReportDocument | null> {
    try {
      const updatedReport = await PetReportModel.findByIdAndUpdate(id, dataPetReport, { new: true });
      return updatedReport;
    } catch (error) {
      throw new Error("Error al actualizar el reporte de mascota");
    }
  }

  //repository para eliminar un reporte de mascota
  async deletePetReport(id: string): Promise<IPetReportDocument | null> {
    try {
      const deletedReport = await PetReportModel.findByIdAndDelete(id);
      if (!deletedReport) {
        throw new Error("Reporte no encontrado");
      }
      return deletedReport;
    } catch (error) {
      throw new Error("Error al eliminar el reporte de mascota");
    }


  }
}