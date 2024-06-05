import { Component, Input, Output, EventEmitter } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { SessionState } from '../../../interfaces/Session-State';
import { SessionStateService } from '../../../services/UtilityServices/session-state/session-state.service';
import { Location } from '../../../interfaces/Location';

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
  @Output() newGame = new EventEmitter<Location>();

  constructor (
    private sessionStateService: SessionStateService
  ) { }

  startNewGame() {
    this.session = this.sessionStateService.newGame();
    this.newGame.emit(this.session.map);
    this.sessionChange.emit(this.session);
  }

}
