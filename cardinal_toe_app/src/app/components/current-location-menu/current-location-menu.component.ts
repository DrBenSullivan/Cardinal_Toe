import { Input, Component, Output, EventEmitter, OnChanges, SimpleChanges } from '@angular/core';
import { Location } from '../../interfaces/Location';
import { DialogModule } from 'primeng/dialog';
import { ButtonModule } from 'primeng/button';
import { NgFor, NgIf, TitleCasePipe } from '@angular/common';
import { SpacedPipe } from '../../pipes/spaced/spaced.pipe';
import { LocationDataService } from '../../services/location-data/location-data.service';
import { LandmarksComponent } from '../landmarks/landmarks.component';
import { SessionStateService } from '../../services/session-state/session-state.service';


@Component({
  selector: 'app-current-location-menu',
  imports: [ DialogModule, ButtonModule, NgIf, TitleCasePipe, SpacedPipe, NgFor, LandmarksComponent ],
  standalone: true,
  templateUrl: './current-location-menu.component.html',
  styleUrls: ['./current-location-menu.component.scss']
})  

export class CurrentLocationMenuComponent implements OnChanges {
  @Input() display: boolean = false;
  @Input() selectedRoute!: Location;
  @Output() changeDisplay = new EventEmitter<boolean>();
  isLandmarksDisplayDisabled: boolean = true;

  ngOnChanges(changes: SimpleChanges): void {
    if (changes) {
      this.isLandmarksDisplayDisabled = true;
      if (this.selectedRoute.hasBeenSearched) {
        this.isLandmarksDisplayDisabled = false;
      }
    }
  }

  closePopup(){
    this.isLandmarksDisplayDisabled = true;
    this.display = false;
    this.changeDisplay.emit(this.display);
  }

  searchLocation() {
    this.isLandmarksDisplayDisabled = false;
  }

}
