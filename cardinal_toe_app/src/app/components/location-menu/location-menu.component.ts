import { Input, Component, Output, EventEmitter } from '@angular/core';
import { DialogModule } from 'primeng/dialog';

@Component({
  selector: 'app-location-menu',
  standalone: true,
  imports: [ DialogModule ],
  templateUrl: './location-menu.component.html',
  styleUrl: './location-menu.component.scss'
})  
export class LocationMenuComponent {
  @Input() display: boolean = false;
  @Input() label: string = "";
  
  modal: boolean = true;

  @Output() displayChange = new EventEmitter();

  onClose(){
    this.displayChange.emit(false);
  }
  
}
