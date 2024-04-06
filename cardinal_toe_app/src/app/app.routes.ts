import { Routes } from '@angular/router';
import { ContentComponent } from './content/content.component';
import { InformationComponent } from './information/information.component';
import { ErrorComponent } from './error/error.component';

export const routes: Routes = [
    {
        path: '',
        redirectTo: '/content',
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
