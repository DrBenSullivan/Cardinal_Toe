import { Component, EventEmitter, Input, Output, OnChanges, SimpleChanges } from '@angular/core';
import { Location } from '../../interfaces/Location';
import { CommonModule } from '@angular/common';
import { NewLocationMenuComponent } from '../new-location-menu/new-location-menu.component';
import { DialogModule } from 'primeng/dialog';
import { ParagraphPipe } from '../../pipes/paragraph/paragraph.pipe';
import { SpacedPipe } from '../../pipes/spaced/spaced.pipe';
import { RoutesService } from '../../services/routes/routes.service';
import { CurrentLocationMenuComponent } from '../current-location-menu/current-location-menu.component';

@Component({
  selector: 'app-narrator',
  standalone: true,
  imports: [ CurrentLocationMenuComponent, NewLocationMenuComponent, DialogModule, CommonModule, ParagraphPipe, SpacedPipe ],
  templateUrl: './narrator.component.html',
  styleUrl: './narrator.component.scss'
})

export class NarratorComponent implements OnChanges {
  @Input() currentLocation!: Location;
  @Output() nextLocation = new EventEmitter<Location>;
  newLocationMenuDisplay: boolean = false;
  currentLocationMenuDisplay: boolean = false;
  routesText: string = "";
  possibleRoutes!: Location[];
  selectedRoute!: Location;

  constructor (
    private routesService: RoutesService
  ) {}

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
