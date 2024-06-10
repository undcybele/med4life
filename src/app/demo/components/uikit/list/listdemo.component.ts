import {Component, inject, OnInit} from '@angular/core';
import {MessageService, SelectItem} from 'primeng/api';
import { DataView } from 'primeng/dataview';
import { PersonData } from 'src/app/demo/api/patient';
import { PatientService } from 'src/app/demo/service/patient.service';
import {Router} from "@angular/router";

@Component({
    templateUrl: './listdemo.component.html',
    providers: [MessageService]
})
export class ListDemoComponent implements OnInit {

    patients: PersonData[] = [];
    router = inject(Router);
    sortField: string = '';
    constructor(private patientService: PatientService) { }

    ngOnInit() {
        this.patientService.getAllPatients().then(data => this.patients = data);
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
    patient: PersonData = {} as PersonData;
    patientDialog: boolean = false;
    messageService = inject(MessageService);

    openNew() {
        this.patient = {
            _id: '',
            health_check_id: '',
            original_id: '',
            date: '',
            person_details: {
                name: "",
                age: null,
                height: null,
                weight: null,
                food_preference: "vegetarian"
            },
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
        this.messageService.add({ severity: 'success', summary: 'Succes!', detail: 'Pacient nou creat cu succes', life: 3000 });
        this.submitted = true;
        this.patientDialog = false;
    }
}
