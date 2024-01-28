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
                    { label: 'Acasă', icon: 'pi pi-fw pi-home', routerLink: ['/'] }
                ]
            },
            {
                label: '',
                items: [
                    { label: 'Lista pacienților', icon: 'pi pi-fw pi-list', routerLink: ['/uikit/list'] },
                    { label: 'Tabel cu pacienți', icon: 'pi pi-fw pi-table', routerLink: ['/uikit/table'] },
                ]
            }
        ];
    }
}
