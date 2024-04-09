import { CommonModule } from '@angular/common';
import { Input, Component, Output, EventEmitter, AfterContentChecked } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { Place } from '../../interfaces/place';

@Component({
  selector: 'app-location-menu',
  standalone: true,
  imports: [ DialogModule, ButtonModule, CommonModule ],
  templateUrl: './location-menu.component.html',
  styleUrl: './location-menu.component.scss'
})  
export class LocationMenuComponent implements AfterContentChecked {
  @Input() display: boolean = false;
  @Input() destination!: Place;
  @Output() displayChange = new EventEmitter<boolean>();
  @Output() changeNode = new EventEmitter<Place>();

  id!: number;
  scene!: string;
  blurb!: string;  

  constructor() {}

  ngAfterContentChecked(): void {
    if(this.destination) {
      this.id = this.destination.id;
      this.scene = this.destination.scene;
      this.blurb = this.destination.blurb ?? this.destination.description;
    }
  }

  closePopup(){
    this.display = false;
    this.displayChange.emit(this.display);
  }

  goToDestination(){
    this.closePopup();
    this.changeNode.emit(this.destination);
    this.displayChange.emit(this.display);
  }
  

}
