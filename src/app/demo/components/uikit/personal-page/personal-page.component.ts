import {Component, effect, inject, signal} from '@angular/core';
import {Router} from "@angular/router";
import {PersonData, status} from "../../../models/patient";
import {PatientService} from "../../../services/patient.service";
import {ChartModule} from "primeng/chart";
import {ToggleButtonModule} from "primeng/togglebutton";
import {FormsModule} from "@angular/forms";
import {NgForOf, NgIf} from "@angular/common";
import {MongodbService} from "../../../services/mongodb.service";

@Component({
  selector: 'app-personal-page',
  standalone: true,
    imports: [
        ChartModule,
        ToggleButtonModule,
        FormsModule,
        NgForOf,
        NgIf
    ],
  templateUrl: './personal-page.component.html',
  styleUrl: './personal-page.component.scss'
})
export class PersonalPageComponent {
    router = inject(Router);
    patientService = inject(PatientService);
    mongoDBService = inject(MongodbService);
    protected readonly userId = this.router.url.split('/')[2];
    protected readonly patientDataYear = signal([] as PersonData[]);
    protected readonly patientDataBasic = signal({} as PersonData);
    protected readonly patientHealthDetails = signal({} as status);
    //true is month
    heartRateTimeFrameView = signal(true);
    bloodPressureTimeFrameView = signal(true);
    heart_rate: any;
    heart_options: any;
    blood_pressure: any;
    blood_options: any;
    nutrition_data:any;
    nutrition_options:any;
    o2_saturation_data: any;
    o2_saturation_options: any;
    sleep_data: any;
    sleep_options: any;

    constructor() {
        this.setInfo().then(() => this.initCharts());

        effect(() => {
            this.initCharts();
        });
    }

    async setInfo(){
        const allData = await this.mongoDBService.getUserById(Number(this.userId));
        console.log('haha', allData);
        const healthData = await this.mongoDBService.getPatientHealthStatus(Number(this.userId));
        console.log('haha', healthData);
        this.patientHealthDetails.set(healthData);
        console.log('haha health', this.patientHealthDetails());
        this.patientDataYear.set(allData);
        this.patientDataBasic.set(this.patientDataYear()[364]);
    }

    initCharts() {
        const month_days = ["1","2","3","4","5","6","7","8","9","10","11","12","13","14","15","16","17","18","19","20","21","22","23","24","25","26","27","28","29","30","31"];
        const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]
        const documentStyle = getComputedStyle(document.documentElement);
        const textColor = documentStyle.getPropertyValue('--text-color');
        const textColorSecondary = documentStyle.getPropertyValue('--text-color-secondary');
        const surfaceBorder = documentStyle.getPropertyValue('--surface-border');
        this.heart_rate = {
            labels: this.heartRateTimeFrameView() ? month_days : months,
            datasets: [
                {
                    label: 'Heart rate',
                    data: this.heartRateTimeFrameView() ? this.patientDataYear().filter(day => day.date.split('-')[1]==='12').map(vital => vital.vital_signs.heart_rate) : this.patientDataYear().filter(day => day.date.split('-')[2]==='01').map(vital => vital.vital_signs.heart_rate),
                    fill: false,
                    backgroundColor: documentStyle.getPropertyValue('--primary-500'),
                    borderColor: documentStyle.getPropertyValue('--primary-500'),
                    tension: .4
                },
            ]
        };

        this.heart_options = {
            plugins: {
                legend: {
                    labels: {
                        fontColor: textColor
                    }
                }
            },
            scales: {
                x: {
                    ticks: {
                        color: textColorSecondary
                    },
                    grid: {
                        color: surfaceBorder,
                        drawBorder: false
                    }
                },
                y: {
                    ticks: {
                        color: textColorSecondary
                    },
                    grid: {
                        color: surfaceBorder,
                        drawBorder: false
                    }
                },
            }
        };

        this.blood_pressure = {
            labels: this.bloodPressureTimeFrameView() ? month_days : months,
            datasets: [
                {
                    label: 'Systolic pressure',
                    backgroundColor: documentStyle.getPropertyValue('--primary-500'),
                    borderColor: documentStyle.getPropertyValue('--primary-500'),
                    data: this.bloodPressureTimeFrameView() ? this.patientDataYear().filter(day => day.date.split('-')[1]==='12').map(vital => vital.vital_signs.blood_pressure_systolic) : this.patientDataYear().filter(day => day.date.split('-')[2]==='01').map(vital => vital.vital_signs.blood_pressure_systolic),
                },
                {
                    label: 'Diastolic pressure',
                    backgroundColor: documentStyle.getPropertyValue('--primary-200'),
                    borderColor: documentStyle.getPropertyValue('--primary-200'),
                    data: this.bloodPressureTimeFrameView() ? this.patientDataYear().filter(day => day.date.split('-')[1]==='12').map(vital => vital.vital_signs.blood_pressure_diastolic) : this.patientDataYear().filter(day => day.date.split('-')[2]==='01').map(vital => vital.vital_signs.blood_pressure_diastolic),
                }
            ]
        };

        this.blood_options = {
            plugins: {
                legend: {
                    labels: {
                        fontColor: textColor
                    }
                }
            },
            scales: {
                x: {
                    ticks: {
                        color: textColorSecondary,
                        font: {
                            weight: 500
                        }
                    },
                    grid: {
                        display: false,
                        drawBorder: false
                    }
                },
                y: {
                    ticks: {
                        color: textColorSecondary
                    },
                    grid: {
                        color: surfaceBorder,
                        drawBorder: false
                    }
                },
            }
        };

        this.nutrition_data = {
            datasets: [{
                data: [
                    this.patientDataBasic().nutrition.carbs,
                    this.patientDataBasic().nutrition.protein,
                    this.patientDataBasic().nutrition.fat,
                ],
                backgroundColor: [
                    documentStyle.getPropertyValue('--indigo-500'),
                    documentStyle.getPropertyValue('--purple-500'),
                    documentStyle.getPropertyValue('--teal-500'),
                    documentStyle.getPropertyValue('--orange-500')
                ],
                label: 'Nutrition Data'
            }],
            labels: [
                'Carbohydrates',
                'Protein',
                'Fat'
            ]
        };
        this.nutrition_options = {
            plugins: {
                legend: {
                    labels: {
                        color: textColor
                    }
                }
            },
            scales: {
                r: {
                    grid: {
                        color: surfaceBorder
                    }
                }
            }
        };

        this.o2_saturation_data = {
            labels: month_days,
            datasets: [
                {
                    label: 'Blood oxygenation level (%)',
                    data: this.patientDataYear().filter(day => day.date.split('-')[1]==='12').map(vital => vital.vital_signs.oxygen_saturation),
                    fill: true,
                    backgroundColor: documentStyle.getPropertyValue('--primary-500'),
                    borderColor: documentStyle.getPropertyValue('--primary-500'),
                    tension: .4
                },
            ]
        };

        this.o2_saturation_options = {
            plugins: {
                legend: {
                    labels: {
                        fontColor: textColor
                    }
                }
            },
            scales: {
                x: {
                    ticks: {
                        color: textColorSecondary
                    },
                    grid: {
                        color: surfaceBorder,
                        drawBorder: true
                    }
                },
                y: {
                    ticks: {
                        color: textColorSecondary
                    },
                    grid: {
                        color: surfaceBorder,
                        drawBorder: true
                    }
                },
            }
        };

        this.sleep_data = {
            labels: month_days,
            datasets: [
                {
                    label: 'Hours of sleep',
                    backgroundColor: documentStyle.getPropertyValue('--primary-500'),
                    borderColor: documentStyle.getPropertyValue('--primary-500'),
                    data: this.patientDataYear().filter(day => day.date.split('-')[1]==='12').map(vital => vital.sleep_duration),
                },
            ]
        };

        this.sleep_options = {
            plugins: {
                legend: {
                    labels: {
                        fontColor: textColor
                    }
                }
            },
            scales: {
                x: {
                    ticks: {
                        color: textColorSecondary,
                        font: {
                            weight: 500
                        }
                    },
                    grid: {
                        display: false,
                        drawBorder: false
                    }
                },
                y: {
                    ticks: {
                        color: textColorSecondary
                    },
                    grid: {
                        color: surfaceBorder,
                        drawBorder: false
                    }
                },
            }
        };

    }

}
