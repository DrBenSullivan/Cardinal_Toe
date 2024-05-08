import { Component, Input, OnInit } from '@angular/core';
import { NgIf, NgFor } from '@angular/common';
import { LandmarksService } from '../../services/landmarks/landmarks.service';
import { Location } from '../../interfaces/Location';
import { LocationDataService } from '../../services/location-data/location-data.service';

@Component({
  selector: 'app-landmarks',
  standalone: true,
  imports: [ NgIf, NgFor ],
  templateUrl: './landmarks.component.html',
  styleUrl: './landmarks.component.scss'
})
export class LandmarksComponent implements OnInit {
  @Input() currentLocation!: Location;
  landmarksArray!: string[];
  landmarksStringArray!: string[];

  constructor (
    private landmarksService: LandmarksService,
    private locationDataService: LocationDataService
  ) {}

  ngOnInit(): void {
    this.landmarksArray = this.landmarksService.filterLandmarks(
      this.locationDataService.fetchLandmarks(this.currentLocation)
    );
    if (this.landmarksArray.length !== 0) {
      this.landmarksStringArray = this.landmarksService.getSentences(this.landmarksArray);
    }
  }
}
