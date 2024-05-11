import { Component } from '@angular/core';
import { OverlayPanelModule } from 'primeng/overlaypanel';

@Component({
  selector: 'app-landmark-menu',
  standalone: true,
  imports: [ OverlayPanelModule ],
  templateUrl: './landmark-menu.component.html',
  styleUrl: './landmark-menu.component.scss'
})

export class LandmarkMenuComponent {

}
