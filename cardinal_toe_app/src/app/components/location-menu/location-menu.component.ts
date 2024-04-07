import { CommonModule } from '@angular/common';
import { Input, Component, Output, EventEmitter } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';

@Component({
  selector: 'app-location-menu',
  standalone: true,
  imports: [ DialogModule, ButtonModule, CommonModule ],
  templateUrl: './location-menu.component.html',
  styleUrl: './location-menu.component.scss'
})  
export class LocationMenuComponent {
  @Input() display: boolean = false;
  @Input() header: string = "";

  @Output() displayChange = new EventEmitter<boolean>();

  closePopup(){
    this.display = false;
    this.displayChange.emit(this.display);
  }
  
}
