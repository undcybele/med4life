import {HttpClient} from '@angular/common/http';
import {Injectable, signal} from '@angular/core';
import {PersonData, UniquePatient} from '../models/patient';
import {MongodbService} from "./mongodb.service";

@Injectable()
export class PatientService {

    constructor(private http: HttpClient, private mongodbService: MongodbService) { }
    readonly patients = signal([]);
    readonly uniquePatients = signal([]);

    async getAllPatients() {
        const res = await this.mongodbService.getUsers();
        this.patients.set(res);
        return res as PersonData[];
    }

    async getAllUniquePatients() {
        const res = await this.mongodbService.getUniquePatients();
        this.uniquePatients.set(res);
        return res as UniquePatient[];
    }

    async getPatientLatestData() {
        const res = await this.mongodbService.getPatientLatestData();
        return res as PersonData[];
    }
    async addPatient(patient: UniquePatient){
        const res = await this.mongodbService.addNewPatient(patient);
        return res as {};
    }

    async getStats(){
        const res = await this.mongodbService.getStats();
        return res as {active: number, old: number, unhealthy: number};
    }
}
