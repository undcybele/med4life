import {HttpClient} from '@angular/common/http';
import {Injectable, signal} from '@angular/core';
import {HealthStatus, PersonData} from '../api/patient';
import {firstValueFrom} from "rxjs";
import {MongodbService} from "./mongodb.service";

@Injectable()
export class PatientService {

    constructor(private http: HttpClient, private mongodbService: MongodbService) { }
    readonly patients = signal([]);

    async getAllPatients() {
        const res = await this.mongodbService.getUsers();
        this.patients.set(res);
        return res as PersonData[];
    }

    async getPatientData(userId: number) {
        const res = await this.mongodbService.getUserById(userId);
        console.log(res);
        return res;
    }

    async getPatientHealthStatus(patientName: string) {
        const res = await firstValueFrom(this.http.get<HealthStatus>('assets/demo/data/health_check_results.json'));
        const data = res[patientName];
        return data;
    }
}
