import { Input, Component, Output, EventEmitter, OnChanges, SimpleChanges } from '@angular/core';
import { Location } from '../../../../interfaces/Location';
import { DialogModule } from 'primeng/dialog';
import { ButtonModule } from 'primeng/button';
import { TitleCasePipe } from '@angular/common';
import { SpacedPipe } from '../../../../pipes/spaced/spaced.pipe';
import { LandmarksComponent } from '../landmarks/landmarks.component';
import { SessionStateService } from '../../../../services/UtilityServices/session-state/session-state.service';


@Component({
  selector: 'app-current-location-menu',
  imports: [ DialogModule, ButtonModule, TitleCasePipe, SpacedPipe, LandmarksComponent ],
  standalone: true,
  templateUrl: './current-location-menu.component.html',
  styleUrls: ['./current-location-menu.component.scss']
})  

export class CurrentLocationMenuComponent implements OnChanges {
  @Input() display: boolean = false;
  @Input() selectedRoute!: Location;
  @Output() changeDisplay = new EventEmitter<boolean>();
  isLandmarksDisplayDisabled: boolean = true;

  constructor (private sessionStateService: SessionStateService){}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes) {
      this.isLandmarksDisplayDisabled = !this.selectedRoute.hasBeenSearched;
    }
  }

  closePopup(){
    if (!this.isLandmarksDisplayDisabled) {
      this.selectedRoute.hasBeenSearched = true;
      this.sessionStateService.saveMapState(this.selectedRoute);
    }
    this.isLandmarksDisplayDisabled = true;
    this.display = false;
    this.changeDisplay.emit(this.display);
  }

  searchLocation() {
    this.isLandmarksDisplayDisabled = false;
  }

}
