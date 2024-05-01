import { Component, EventEmitter, Input, Output, OnChanges, SimpleChanges } from '@angular/core';
import { Location } from '../../interfaces/Location';
import { CommonModule } from '@angular/common';
import { LocationMenuComponent } from '../location-menu/location-menu.component';
import { DialogModule } from 'primeng/dialog';
import { ParagraphPipe } from '../../pipes/paragraph/paragraph.pipe';
import { SpacedPipe } from '../../pipes/spaced/spaced.pipe';
import { RouteTextGeneratorService } from '../../services/route-text-generator/route-text-generator.service';

@Component({
  selector: 'app-narrator',
  standalone: true,
  imports: [ LocationMenuComponent, DialogModule, CommonModule, ParagraphPipe, SpacedPipe ],
  templateUrl: './narrator.component.html',
  styleUrl: './narrator.component.scss'
})

export class NarratorComponent implements OnChanges {
  @Input() currentLocation!: Location;
  @Output() nextLocation = new EventEmitter<Location>;

  locationMenuDisplay: boolean = false;
  routesText!: string;
  possibleRoutes!: Location[];
  selectedRoute!: Location;
  isCurrentLocation!: boolean;

  constructor (
    private routeTextGenerator: RouteTextGeneratorService
  ) {}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes) {

      this.possibleRoutes = Array.from(this.currentLocation.routes);

      if (this.currentLocation.previousLocation) {
        this.possibleRoutes.push(this.currentLocation.previousLocation);
      }
      
      this.routesText = this.routeTextGenerator.getRoutesText(this.possibleRoutes);
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
