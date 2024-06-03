import { Component, Input, Output, EventEmitter } from '@angular/core';
import { MapGeneratorService } from '../../services/LocationServices/map-generator/map-generator.service';
import { ButtonModule } from 'primeng/button';
import { SessionState } from '../../interfaces/Session-State';
import { Location } from '../../interfaces/Location';

@Component({
  selector: 'app-victory',
  standalone: true,
  imports: [ ButtonModule ],
  templateUrl: './victory.component.html',
  styleUrl: './victory.component.scss'
})
export class VictoryComponent {
  @Input() session!: SessionState;
  @Output() newGame = new EventEmitter<SessionState>();

  constructor (
    private mapGeneratorService: MapGeneratorService
  ) { }

  startNewGame() {
    const newMap: Location = this.mapGeneratorService.resetMap();
    const newSession: SessionState = {
      map: newMap,
      itemSearchList: [],
      inventory: [],
      isVictoryConditionMet: false

    }
    this.newGame.emit(newSession);
  }

}
