import { Component, Input, Output, EventEmitter } from '@angular/core';
import { MapGeneratorService } from '../../services/LocationServices/map-generator/map-generator.service';
import { ButtonModule } from 'primeng/button';
import { SessionState } from '../../interfaces/Session-State';
import { Location } from '../../interfaces/Location';
import { SessionStateService } from '../../services/UtilityServices/session-state/session-state.service';

@Component({
  selector: 'app-victory',
  standalone: true,
  imports: [ ButtonModule ],
  templateUrl: './victory.component.html',
  styleUrl: './victory.component.scss'
})
export class VictoryComponent {
  @Input() session!: SessionState;
  @Output() sessionChange = new EventEmitter<SessionState>();

  constructor (
    private mapGeneratorService: MapGeneratorService,
    private sessionStateService: SessionStateService
  ) { }

  startNewGame() {
    const newSession = this.sessionStateService.newGame();
    this.sessionChange.emit(newSession);
  }

}
