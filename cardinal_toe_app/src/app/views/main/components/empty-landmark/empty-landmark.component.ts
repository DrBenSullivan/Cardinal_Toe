import { Component, Input, OnInit } from '@angular/core';
import { Landmark } from '../../../../interfaces/Landmark';
import { TitleCasePipe } from '@angular/common';
import { SessionStateService } from '../../../../services/UtilityServices/session-state/session-state.service';

@Component({
  selector: 'app-empty-landmark',
  standalone: true,
  imports: [ TitleCasePipe ],
  templateUrl: './empty-landmark.component.html',
  styleUrl: './empty-landmark.component.scss'
})
export class EmptyLandmarkComponent implements OnInit {
  @Input() sentence?: string;
  @Input() landmark!: Landmark;

  isSentenceProvided!: boolean;
  isLandmarkSearched: boolean = false;

  constructor(
    private sessionStateService: SessionStateService
  ) {}

  ngOnInit(){
    if(this.sentence) {
      this.isSentenceProvided = true;
    }
    else {
      this.isSentenceProvided = false;
    }
  }

  searchLandmark(): void {
    this.sessionStateService.searchForItems();
    this.isLandmarkSearched = true;
  }
}
