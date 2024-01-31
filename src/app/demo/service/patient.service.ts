import {HttpClient} from '@angular/common/http';
import {Injectable, signal} from '@angular/core';
import {HealthStatus, PersonData} from '../api/customer';
import {firstValueFrom} from "rxjs";

@Injectable()
export class PatientService {

    constructor(private http: HttpClient) { }
    readonly patients = signal([]);

    async getAllPatients() {
        const res = await firstValueFrom(this.http.get<any>('assets/demo/data/unique_patients.json'));
        this.patients.set(res);
        return res as PersonData[];
    }

    async getPatientData(patientName: string) {
        const res = await firstValueFrom(this.http.get<{data: PersonData[]}>('assets/demo/data/patients.json'));
        console.log('data', res);
        const data = res.data.filter(patient => patient.person_details.name === patientName);
        console.log('data1', data);
        return data;
    }

    async getPatientHealthStatus(patientName: string) {
        const res = await firstValueFrom(this.http.get<HealthStatus>('assets/demo/data/health_check_results.json'));
        const data = res[patientName];
        return data;
    }
}
