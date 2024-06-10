import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { PersonData } from 'src/app/demo/api/patient';
import { PatientService } from 'src/app/demo/service/patient.service';
import { Table } from 'primeng/table';
import { MessageService, ConfirmationService } from 'primeng/api';

interface expandedRows {
    [key: string]: boolean;
}

@Component({
    templateUrl: './tabledemo.component.html',
    providers: [MessageService, ConfirmationService]
})
export class TableDemoComponent implements OnInit {

    statuses: any[] = [];

    patients: PersonData[] = [];

    loading: boolean = true;

    @ViewChild('filter') filter!: ElementRef;

    constructor(private patientService: PatientService) { }

    ngOnInit() {
        this.patientService.getAllPatients().then(patients => this.patients = patients);
        console.log('patients', this.patients);
        this.patientService.getAllPatients().then(patients => {
            this.patients = patients;
            this.loading = false;
        });
    }

    onGlobalFilter(table: Table, event: Event) {
        table.filterGlobal((event.target as HTMLInputElement).value, 'contains');
    }

    clear(table: Table) {
        table.clear();
        this.filter.nativeElement.value = '';
    }

}
