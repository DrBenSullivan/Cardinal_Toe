import { Routes } from '@angular/router';
import { ContentComponent } from './content/content.component';
import { InformationComponent } from './information/information.component';

export const routes: Routes = [
    {
        path: '',
        component: ContentComponent,
        title: 'TITLE - CONTENT'
    } ,
    {
        path: 'info',
        component: InformationComponent,
        title: 'TITLE - Information'
    }
];   
