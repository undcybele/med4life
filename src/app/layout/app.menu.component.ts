import { OnInit } from '@angular/core';
import { Component } from '@angular/core';
import { LayoutService } from './service/app.layout.service';

@Component({
    selector: 'app-menu',
    templateUrl: './app.menu.component.html'
})
export class AppMenuComponent implements OnInit {

    model: any[] = [];

    constructor(public layoutService: LayoutService) { }

    ngOnInit() {
        this.model = [
            {
                label: '',
                items: [
                    { label: 'Home', icon: 'pi pi-fw pi-home', routerLink: ['/'] }
                ]
            },
            {
                label: '',
                items: [
                    { label: 'List of patients', icon: 'pi pi-fw pi-list', routerLink: ['/uikit/list'] },
                    { label: 'Table of patients', icon: 'pi pi-fw pi-table', routerLink: ['/uikit/table'] },
                ]
            }
        ];
    }
}
