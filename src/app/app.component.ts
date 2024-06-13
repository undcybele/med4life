import { Component, OnInit } from '@angular/core';
import { PrimeNGConfig } from 'primeng/api';
import {PatientService} from "./demo/services/patient.service";

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html'
})
export class AppComponent implements OnInit {

    constructor(private primengConfig: PrimeNGConfig, private patientService: PatientService) { }

    ngOnInit() {
        this.primengConfig.ripple = true;
        this.patientService.getAllUniquePatients().then();
    }
}
