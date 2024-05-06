import { Input, Component, Output, EventEmitter, OnChanges, SimpleChanges } from '@angular/core';
import { Location } from '../../interfaces/Location';
import { DialogModule } from 'primeng/dialog';
import { ButtonModule } from 'primeng/button';
import { NgFor, NgIf, TitleCasePipe } from '@angular/common';
import { SpacedPipe } from '../../pipes/spaced/spaced.pipe';
import { LocationDataFetcherService } from '../../services/location-data/location-data.service';


@Component({
  selector: 'app-location-menu',
  imports: [ DialogModule, ButtonModule, NgIf, TitleCasePipe, SpacedPipe, NgFor],
  standalone: true,
  templateUrl: './location-menu.component.html',
  styleUrls: ['./location-menu.component.scss']
})  

export class LocationMenuComponent implements OnChanges {
  @Input() display: boolean = false;
  @Input() selectedRoute!: Location;
  @Input() isCurrent!: boolean;
  @Output() changeDisplay = new EventEmitter<boolean>();
  @Output() newLocation = new EventEmitter<Location>();

  isSearchDisabled: boolean = true;
  hasBeenSearched: boolean = false;
  isGoToDisabled: boolean = true;
  localLandmarks: string[] = [];

  private readonly newProperty = this;

  constructor (
    private locationDataFetcher: LocationDataFetcherService
  ) {}

  ngOnChanges(changes: SimpleChanges): void {
    this.resetLocalVariables();

    // If area is searchable, check if landmarks exist in JSON & store in local array.
    if (this.isCurrent) {
      this.isSearchDisabled = false;
      this.localLandmarks = this.locationDataFetcher.fetchLandmarks(this.selectedRoute);
    } else {
      this. isGoToDisabled = false;
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

  searchLocation() {
    this.hasBeenSearched = true;
    this.isSearchDisabled = true; 
  }

  resetLocalVariables() {
    this.isSearchDisabled = true;
    this.hasBeenSearched = false;
    this.isGoToDisabled  = true;
    this.localLandmarks = [];
  }

}
