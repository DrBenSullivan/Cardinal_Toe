import { Component, EventEmitter, Input, Output, OnChanges, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DialogModule } from 'primeng/dialog';
import { OverlayPanelModule } from 'primeng/overlaypanel';
import { RoutesService } from '../../services/LocationServices/routes/routes.service';

import { NewLocationMenuComponent } from '../new-location-menu/new-location-menu.component';
import { CurrentLocationMenuComponent } from '../current-location-menu/current-location-menu.component';

import { Location } from '../../interfaces/Location';

import { ParagraphPipe } from '../../pipes/paragraph/paragraph.pipe';
import { SpacedPipe } from '../../pipes/spaced/spaced.pipe';

@Component({
  selector: 'app-narrator',
  standalone: true,
  imports: [
    CurrentLocationMenuComponent,
    NewLocationMenuComponent,
    DialogModule,
    CommonModule,
    ParagraphPipe,
    SpacedPipe,
    OverlayPanelModule
  ],
  templateUrl: './narrator.component.html',
  styleUrl: './narrator.component.scss'
})

export class NarratorComponent implements OnChanges {

  @Input() currentLocation!: Location;
  @Output() nextLocation = new EventEmitter<Location>;

  possibleRoutes!: Location[];
  selectedRoute!: Location;

  constructor (
    private routesService: RoutesService
  ) {}

  newLocationMenuDisplay: boolean = false;
  currentLocationMenuDisplay: boolean = false;
  routesText: string = "";

  ngOnChanges(changes: SimpleChanges) {
    if (changes) {
      this.possibleRoutes = this.routesService.getRoutes(this.currentLocation);
      this.routesText = this.routesService.getRoutesText(this.possibleRoutes);
    }
  }

  openNewLocationMenu (route: Location) {
    this.selectedRoute = route;
    this.newLocationMenuDisplay = true;
  }

  changeNewLocationMenuDisplay (event: boolean) {
    this.newLocationMenuDisplay = event;
  }

  goToLocation (route: Location) {
    this.nextLocation.emit(route);
  }

  openCurrentLocationMenu (route: Location) {
    this.selectedRoute = route;
    this.currentLocationMenuDisplay = true;
  }

  changeCurrentLocationMenuDisplay (event: boolean) {
    this.currentLocationMenuDisplay = event;
  }

}
