import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UIkitRoutingModule } from './uikit-routing.module';
import {MessageService} from "primeng/api";

@NgModule({
	imports: [
		CommonModule,
		UIkitRoutingModule,
	]
})
export class UIkitModule { }
