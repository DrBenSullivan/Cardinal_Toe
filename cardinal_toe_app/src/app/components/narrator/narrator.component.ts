import { Component, EventEmitter, Input, Output, OnInit } from '@angular/core';
import { Place } from '../../interfaces/place';
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
  @Input() node!: Place;

  locationMenuDisplay: boolean = false;
  currentLocation: boolean = false;
  routesText: string = "";
  destinationObjectsArray: Place[] = [];
  destinationScenesArray: string[] = [];
  destinationText: string = "";
  selectedDestination?: Place;

  constructor(private destinationService: DestinationsService) {
  }

  ngOnInit(): void {
    this.updateDestinations();
  }

  newNode(node: Place){
    this.node = node;
    this.updateDestinations();
  }

  updateDestinations() {
    this.locationMenuDisplay = false;
    this.routesText = "";
    this.destinationObjectsArray = [];
    this.destinationScenesArray = [];
    this.destinationText = "";
    this.destinationText = this.destinationService.getDestinations(this.node, this.destinationObjectsArray, this.destinationScenesArray);
  }
  
  openLocationMenu (destination: Place, current: boolean) {
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
