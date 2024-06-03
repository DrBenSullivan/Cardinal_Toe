import { Component, OnInit } from '@angular/core';
import { Location } from '../../../interfaces/Location';
import { MapGeneratorService } from '../../../services/LocationServices/map-generator/map-generator.service';
import { SessionStateService } from '../../../services/UtilityServices/session-state/session-state.service';
import { VictoryComponent } from '../../../pages/victory/victory.component';
import { NgSwitch, NgSwitchCase } from '@angular/common';
import { NarratorComponent } from '../../main/components/narrator/narrator.component';
import { SessionState } from '../../../interfaces/Session-State';


@Component({
  selector: 'app-content',
  standalone: true,
  imports: [ NarratorComponent, VictoryComponent, NgSwitch, NgSwitchCase ],
  templateUrl: './content.component.html',
  styleUrls: ['./content.component.scss']
})

export class ContentComponent implements OnInit {
  currentLocation!: Location;
  currentSession!: SessionState;
  isNewSession!: boolean;

  constructor(
    private mapGeneratorService: MapGeneratorService,
    private sessionStateService: SessionStateService
  ) { }

  ngOnInit() {
    this.currentSession = this.sessionStateService.checkIfNewSession();
    this.currentLocation = this.currentSession.map;
  }

  changeCurrentLocation(route: Location) {
    this.currentLocation = route;
    this.sessionStateService.saveMapState(route);
    this.currentLocation = this.sessionStateService.getMapState();
    console.log(this.currentLocation);
  }

}