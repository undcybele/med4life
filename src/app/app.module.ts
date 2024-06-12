import { NgModule } from '@angular/core';
import { PathLocationStrategy, LocationStrategy } from '@angular/common';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { AppLayoutModule } from './layout/app.layout.module';
import { NotfoundComponent } from './demo/components/notfound/notfound.component';
import { IconService } from './demo/service/icon.service';
import { PatientService } from './demo/service/patient.service';
import {RouterModule} from "@angular/router";

@NgModule({
    declarations: [AppComponent, NotfoundComponent],
    imports: [AppRoutingModule, AppLayoutModule, RouterModule],
    providers: [
        { provide: LocationStrategy, useClass: PathLocationStrategy },
        IconService,
        PatientService,
    ],
    bootstrap: [AppComponent],
})
export class AppModule {}
