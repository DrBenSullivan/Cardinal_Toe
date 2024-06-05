import { Routes } from '@angular/router';
import { ContentComponent } from './view/content/content.component';
import { InformationComponent } from './view/pages/information/information.component';
import { ErrorComponent } from './view/pages/error/error.component';

export const routes: Routes = [
    {
        path: '',
        redirectTo: '/info',
        pathMatch: 'full'
    } ,
    {
        path: 'content',
        component: ContentComponent,
        title: 'The Curious Adventures of Cardinal Toe: CONTENT'
    } ,
    {
        path: 'info',
        component: InformationComponent,
        title: 'The Curious Adventures of Cardinal Toe: ABOUT'
    } , 
    {
        path: '**',
        component: ErrorComponent,
        title: 'The Curious Adventures of Cardinal Toe: PAGE NOT FOUND'
    }
];   
