import { Component, OnInit } from '@angular/core';
import { Location } from '../../interfaces/Location';
import { MapGeneratorService } from '../../services/map-generator/map-generator.service';
import { SessionStateService } from '../../services/UtilityServices/session-state/session-state.service';
import { VictoryComponent } from '../../pages/victory/victory.component';
import { NgSwitch, NgSwitchCase } from '@angular/common';
import { NarratorComponent } from '../../components/narrator/narrator.component';


@Component({
  selector: 'app-content',
  standalone: true,
  imports: [ NarratorComponent, VictoryComponent, NgSwitch, NgSwitchCase ],
  templateUrl: './content.component.html',
  styleUrls: ['./content.component.scss']
})

export class ContentComponent implements OnInit {
  currentLocation!: Location;
  isNewSession!: boolean;

  constructor(
    private mapGeneratorService: MapGeneratorService,
    private sessionStateService: SessionStateService
  ) { }

  ngOnInit() {
    this.isNewSession = this.sessionStateService.checkIfNewGame();
    if (this.isNewSession) {
      this.currentLocation = this.mapGeneratorService.getMap();
      console.log(this.currentLocation);
    } else {
      this.currentLocation = this.sessionStateService.getGameState();
    }
  }

  changeCurrentLocation(route: Location) {
    this.currentLocation = route;
    this.sessionStateService.saveGameState(route);
    console.log(this.currentLocation);
  }

}