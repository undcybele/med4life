import {Component, OnInit, OnDestroy, inject} from '@angular/core';
import { MenuItem } from 'primeng/api';
import { PatientService } from '../../services/patient.service';
import { Subscription, debounceTime } from 'rxjs';
import { LayoutService } from 'src/app/layout/service/app.layout.service';
import {PersonData, UniquePatient} from '../../models/patient';
import {Router} from "@angular/router";

@Component({
    templateUrl: './dashboard.component.html',
})
export class DashboardComponent implements OnInit, OnDestroy {
    router = inject(Router);

    patients!: UniquePatient[];

    subscription!: Subscription;

    stats: {active: number, old: number, unhealthy: number}

    constructor(private patientService: PatientService) {
        this.patientService.getAllUniquePatients().then(patients => this.patients = patients);
    }

    ngOnInit() {
        this.patientService.getAllUniquePatients().then(data => {
            this.patients = data;
        });
        this.patientService.getStats().then(data => {
            this.stats = data;
        });
        console.log('haha', this.stats);
    }

    ngOnDestroy() {
        if (this.subscription) {
            this.subscription.unsubscribe();
        }
    }

    goToPersonal(patient: PersonData) {
        console.log('patient haha', patient);
        this.router.navigate([`personal/${patient.health_check_id}`]).then();
    }
}
