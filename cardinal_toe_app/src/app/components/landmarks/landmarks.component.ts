import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { NgIf, NgFor, NgSwitch, NgSwitchCase, NgSwitchDefault, TitleCasePipe } from '@angular/common';
import { LandmarkSentenceService } from '../../services/landmark-sentence/landmark-sentence.service';
import { Location } from '../../interfaces/Location';

@Component({
  selector: 'app-landmarks',
  standalone: true,
  imports: [ NgIf, NgFor, NgSwitch, NgSwitchCase, NgSwitchDefault, TitleCasePipe ],
  templateUrl: './landmarks.component.html',
  styleUrl: './landmarks.component.scss'
})
export class LandmarksComponent implements OnChanges {
  @Input() currentLocation!: Location;
  previouslySearched: boolean = false;
  landmarksStringArray!: string[];

  constructor (
    private landmarkSentenceService: LandmarkSentenceService,
  ) {}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes) {
      if(this.currentLocation.hasBeenSearched) {
        this.previouslySearched = true;
      }
      if (!this.currentLocation.hasBeenSearched){
        this.currentLocation.hasBeenSearched = true;
        this.landmarksStringArray = this.landmarkSentenceService.getSentences(this.currentLocation.landmarks.length);
      }
    }
  }
}
