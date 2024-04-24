import { Input, Component, Output, EventEmitter, OnChanges, SimpleChanges } from '@angular/core';
import { Location } from '../../interfaces/Location';
import { DialogModule } from 'primeng/dialog';
import { ButtonModule } from 'primeng/button';
import { NgIf, TitleCasePipe } from '@angular/common';

@Component({
  selector: 'app-location-menu',
  imports: [ DialogModule, ButtonModule, NgIf, TitleCasePipe ],
  standalone: true,
  templateUrl: './location-menu.component.html',
  styleUrls: ['./location-menu.component.scss']
})  

export class LocationMenuComponent implements OnChanges {
  @Input() display: boolean = false;
  @Input() selectedRoute!: Location;
  @Input() isCurrentLocation!: boolean;
  @Output() changeDisplay = new EventEmitter<boolean>();
  @Output() newLocation = new EventEmitter<Location>();

  canSearch!: boolean;
  canGo!: boolean;

  ngOnChanges(changes: SimpleChanges): void {
    if (changes && this.selectedRoute) {
      this.canSearch = !this.isCurrentLocation;
      this.canGo = this.isCurrentLocation;

      console.log(this.isCurrentLocation, this.canSearch, this.canGo);
    }
  }
  
  closePopup(){
    this.display = false;
    this.changeDisplay.emit(this.display);
  }

  goToLocation(route: Location){
    this.newLocation.emit(route);
    this.closePopup();  
  }

}
