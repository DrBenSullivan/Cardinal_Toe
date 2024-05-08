import { Input, Component, Output, EventEmitter, OnChanges, SimpleChanges } from '@angular/core';
import { Location } from '../../interfaces/Location';
import { DialogModule } from 'primeng/dialog';
import { ButtonModule } from 'primeng/button';
import { NgFor, NgIf, TitleCasePipe } from '@angular/common';
import { SpacedPipe } from '../../pipes/spaced/spaced.pipe';
import { LocationDataService } from '../../services/location-data/location-data.service';
import { LandmarksComponent } from '../landmarks/landmarks.component';


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

  hasBeenSearched: boolean = false;
  localLandmarks: string[] = [];

  constructor (
    private locationDataService: LocationDataService
  ) {}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes) {
      this.hasBeenSearched = false;
      this.localLandmarks = [];
    }
  }

  closePopup(){
    this.display = false;
    this.changeDisplay.emit(this.display);
  }

  searchLocation() {
    this.localLandmarks = this.locationDataService.fetchLandmarks(this.selectedRoute);
    this.hasBeenSearched = true;
  }

}
