import { Component, EventEmitter, Input, Output, OnInit } from '@angular/core';
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

export class NarratorComponent implements OnInit {
  @Input() node!: Location;

  locationMenuDisplay: boolean = false;
  currentLocation: boolean = false;
  routesText: string = "";
  destinationObjectsArray: Location[] = [];
  destinationNamesArray: string[] = [];
  destinationText: string = "";
  selectedDestination?: Location;

  constructor(private destinationService: DestinationsService) {
  }

  ngOnInit(): void {
    this.updateDestinations();
  }

  newLocation(node: Location){
    this.node = node;
    this.updateDestinations();
  }

  updateDestinations() {
    this.locationMenuDisplay = false;
    this.routesText = "";
    this.destinationObjectsArray = [];
    this.destinationNamesArray = [];
    this.destinationText = "";
    this.destinationText = this.destinationService.getDestinations(this.node, this.destinationObjectsArray, this.destinationNamesArray);
  }
  
  openLocationMenu (destination: Location, current: boolean) {
    if(destination) {
      this.currentLocation = current;
      this.selectedDestination = destination;
      this.locationMenuDisplay = true;
    }
  }

  changeLocationMenuDisplay (event: boolean) {
    this.locationMenuDisplay = event;
  }

}
