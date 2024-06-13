import {Component, effect, inject, OnInit} from '@angular/core';
import {MessageService} from 'primeng/api';
import { DataView } from 'primeng/dataview';
import {PersonData, UniquePatient} from 'src/app/demo/models/patient';
import { PatientService } from 'src/app/demo/services/patient.service';
import {Router} from "@angular/router";

@Component({
    templateUrl: './listdemo.component.html',
    providers: [MessageService]
})
export class ListDemoComponent {

    patients: PersonData[] = [];
    router = inject(Router);
    sortField: string = '';
    constructor(private patientService: PatientService) {
        this.patientService.getPatientLatestData().then(data => this.patients = data);
        effect((submitted) => {
            this.patientService.getPatientLatestData().then(data => this.patients = data);
        });
    }

    onFilter(dv: DataView, event: Event) {
        dv.filter((event.target as HTMLInputElement).value);
    }

    analyzeHealth(person: PersonData): string {
        const { vital_signs, person_details: { age } } = person;

        // Weight the importance of each vital sign based on age
        let heartRateWeight = 1;
        let bloodPressureWeight = 1;
        let oxygenSaturationWeight = 1;

        if (age >= 50) {
            heartRateWeight *= 0.8;
            bloodPressureWeight *= 1.08;
        }

        // Check for issues
        if (vital_signs.heart_rate && vital_signs.heart_rate > 162 * heartRateWeight) {
            return 'heart_rate_issue';
        }

        if (vital_signs.blood_pressure_systolic && (vital_signs.blood_pressure_systolic > 130 * bloodPressureWeight) || (vital_signs.blood_pressure_systolic < 90 * bloodPressureWeight)) {
            return 'blood_pressure_issue';
        }

        if (vital_signs.blood_pressure_diastolic && (vital_signs.blood_pressure_diastolic > 90 * bloodPressureWeight) || (vital_signs.blood_pressure_diastolic < 70)) {
            return 'blood_pressure_issue';
        }

        if (vital_signs.oxygen_saturation && vital_signs.oxygen_saturation < 96 * oxygenSaturationWeight) {
            return 'oxygen_saturation_issue';
        }

        return 'healthy';
    }


    goToPersonal(patient: PersonData) {
        this.router.navigate([`personal/${patient.health_check_id}`]).then();
    }

    submitted: boolean = false;
    patient: UniquePatient = {} as UniquePatient;
    patientDialog: boolean = false;
    messageService = inject(MessageService);

    openNew() {
        this.patient = {
            name: "",
            age: null,
            height: null,
            weight: null,
            food_preference: "vegetarian"
        };
        this.submitted = false;
        this.patientDialog = true;
    }
    hideDialog() {
        this.patientDialog = false;
        this.submitted = false;
    }

    savePatient() {
        console.log(this.patient);
        try{
            this.patientService.addPatient(this.patient).then();
            this.messageService.add({ severity: 'success', summary: 'Succes!', detail: 'New patient created successfully', life: 3000 });
        }
        catch(error){
            this.messageService.add({ severity: 'danger', summary: 'OOPS!', detail: 'Something went wrong.', life: 3000 });
        }
        this.submitted = true;
        this.patientDialog = false;
    }
}
