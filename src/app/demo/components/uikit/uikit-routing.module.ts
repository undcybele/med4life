import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

@NgModule({
    imports: [RouterModule.forChild([
        { path: 'charts', data: { breadcrumb: 'Charts' }, loadChildren: () => import('./charts/chartsdemo.module').then(m => m.ChartsDemoModule) },
        { path: 'list', data: { breadcrumb: 'Lista' }, loadChildren: () => import('./list/listdemo.module').then(m => m.ListDemoModule) },
        { path: 'personal', data: { breadcrumb: 'Personal' }, loadChildren: () => import('./personal-page/personal-page.module').then(m => m.PersonalPageModule) },
        { path: 'table', data: { breadcrumb: 'Tabel' }, loadChildren: () => import('./table/tabledemo.module').then(m => m.TableDemoModule) },
        { path: '**', redirectTo: '/notfound' }
    ])],
    exports: [RouterModule]
})
export class UIkitRoutingModule { }
