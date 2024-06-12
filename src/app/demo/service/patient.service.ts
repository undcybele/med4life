import {HttpClient} from '@angular/common/http';
import {Injectable, signal} from '@angular/core';
import {PersonData, UniquePatient} from '../api/patient';
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
}
