import { Input, Component, Output, EventEmitter, OnChanges, SimpleChanges } from '@angular/core';
import { Location } from '../../interfaces/Location';
import { DialogModule } from 'primeng/dialog';
import { ButtonModule } from 'primeng/button';
import { NgFor, NgIf, TitleCasePipe } from '@angular/common';
import { SpacedPipe } from '../../pipes/spaced/spaced.pipe';


@Component({
  selector: 'app-new-location-menu',
  imports: [ DialogModule, ButtonModule, NgIf, TitleCasePipe, SpacedPipe, NgFor],
  standalone: true,
  templateUrl: './new-location-menu.component.html',
  styleUrls: ['./new-location-menu.component.scss']
})  

export class NewLocationMenuComponent implements OnChanges {
  @Input() display: boolean = false;
  @Input() selectedRoute!: Location;
  @Output() changeDisplay = new EventEmitter<boolean>();
  @Output() newLocation = new EventEmitter<Location>();

  ngOnChanges(changes: SimpleChanges): void {
    if (!changes){ 
      return
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
