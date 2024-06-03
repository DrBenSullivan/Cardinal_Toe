import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { NgIf, NgFor, NgSwitch, NgSwitchCase, NgSwitchDefault, TitleCasePipe } from '@angular/common';
import { LandmarkSentenceService } from '../../../../services/LandmarkServices/landmark-sentence/landmark-sentence.service';
import { LandmarkMenuComponent } from '../landmark-menu/landmark-menu.component';
import { Location } from '../../../../interfaces/Location';
import { Landmark } from '../../../../interfaces/Landmark';
import { DialogModule } from 'primeng/dialog';
import { EmptyLandmarkComponent } from '../empty-landmark/empty-landmark.component';

@Component({
  selector: 'app-landmarks',
  standalone: true,
  imports: [ NgIf, NgFor, NgSwitch, NgSwitchCase, NgSwitchDefault, TitleCasePipe, LandmarkMenuComponent, DialogModule, EmptyLandmarkComponent],
  templateUrl: './landmarks.component.html',
  styleUrl: './landmarks.component.scss'
})
export class LandmarksComponent implements OnChanges {
  @Input() currentLocation!: Location;
  landmarksStringArray!: string[];
  landmarkWithTarget?: Landmark;
  previouslySearched!: boolean;
  
  landmarkMenuDisplay: boolean = false;

  constructor (
    private landmarkSentenceService: LandmarkSentenceService,
  ) {}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes) {
      if(this.currentLocation.hasBeenSearched) {
        this.previouslySearched = true;
      }

      if (!this.currentLocation.hasBeenSearched){
        this.previouslySearched = false;
        this.landmarksStringArray = this.landmarkSentenceService.getSentences(this.currentLocation.landmarks.length);
      }

      for (let landmark of this.currentLocation.landmarks){
        if (landmark.contents.length > 0)
          {
            this.landmarkWithTarget = landmark!;
          }
      }
    }
  }

  changeLandmarkMenuDisplay(event: boolean) {
    this.landmarkMenuDisplay = event;
  }
}
