import { Component, EventEmitter, Input, Output, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import { Location } from '../../interfaces/Location';
import { CommonModule, NgForOf } from '@angular/common';
import { LocationMenuComponent } from '../location-menu/location-menu.component';
import { DialogModule } from 'primeng/dialog';
import { ParagraphPipe } from '../../pipes/paragraph.pipe';
import { DestinationsService } from '../../services/destinations/destinations.service';

@Component({
  selector: 'app-narrator',
  standalone: true,
  imports: [ LocationMenuComponent, DialogModule, CommonModule, ParagraphPipe, NgForOf ],
  templateUrl: './narrator.component.html',
  styleUrl: './narrator.component.scss'
})

export class NarratorComponent implements OnChanges {
  @Input() currentLocation!: Location;
  @Output() nextLocation = new EventEmitter<Location>;

  locationMenuDisplay: boolean = false;
  routesText!: string;
  selectedRoute!: Location;
  isCurrentLocation!: boolean;

  constructor (
    private destinationsService: DestinationsService
  ) {}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes) {
      this.routesText = this.destinationsService.getDestinationText(this.currentLocation.routes);
    }
  }

  goToLocation (route: Location) {
    this.nextLocation.emit(route);
  }

  openLocationMenu (route: Location, isCurrent: boolean) {
    this.selectedRoute = route;
    this.isCurrentLocation = isCurrent;
    this.locationMenuDisplay = true;
    
  }

  changeLocationMenuDisplay (event: boolean) {
    this.locationMenuDisplay = event;
  }

}
