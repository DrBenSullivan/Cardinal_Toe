import { Component, OnInit } from '@angular/core';
import { Location } from '../../interfaces/Location';
import { NarratorComponent } from '../narrator/narrator.component';
import { LocationGeneratorService } from '../../services/location-generator/location-generator.service'
import { MapGeneratorService } from '../../services/map-generator/map-generator.service';


@Component({
  selector: 'app-content',
  standalone: true,
  imports: [ NarratorComponent ],
  templateUrl: './content.component.html',
  styleUrls: ['./content.component.scss']
})

export class ContentComponent implements OnInit {

  currentLocation!: Location;

  constructor(
    private mapGeneratorService: MapGeneratorService
  ) { }

  ngOnInit() {
    this.currentLocation = this.mapGeneratorService.getMap();
    console.log(this.currentLocation);
  }

  changeCurrentLocation(route: Location) {
    this.currentLocation = route;
    console.log(this.currentLocation);
  }

}