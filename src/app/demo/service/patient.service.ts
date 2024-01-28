import {HttpClient} from '@angular/common/http';
import {Injectable, signal} from '@angular/core';
import {PersonData} from '../api/customer';
import {firstValueFrom, Observable} from "rxjs";
import {map} from "rxjs/operators";

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
        const res = await firstValueFrom(this.http.get<PersonData[]>('assets/demo/data/patients.json').pipe(map<unknown, PersonData[]>(response => response["data"])));
        const data = res.filter(patient => patient.person_details.name === patientName);
        return data;
    }
}
