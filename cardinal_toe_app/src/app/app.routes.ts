import { Routes } from '@angular/router';
import { ContentComponent } from './layout/content/content.component';
import { InformationComponent } from './pages/information/information.component';
import { ErrorComponent } from './pages/error/error.component';

export const routes: Routes = [
    {
        path: '',
        redirectTo: '/info',
        pathMatch: 'full'
    } ,
    {
        path: 'content',
        component: ContentComponent,
        title: 'TITLE - CONTENT'
    } ,
    {
        path: 'info',
        component: InformationComponent,
        title: 'TITLE - Information'
    } , 
    {
        path: '**',
        component: ErrorComponent
    }
];   
