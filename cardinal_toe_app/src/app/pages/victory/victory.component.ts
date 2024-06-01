import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Location } from '../../interfaces/Location';
import { MapGeneratorService } from '../../services/LocationServices/map-generator/map-generator.service';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-victory',
  standalone: true,
  imports: [ ButtonModule ],
  templateUrl: './victory.component.html',
  styleUrl: './victory.component.scss'
})
export class VictoryComponent {
  @Input() currentLocation!: Location | null;
  @Output() newMap = new EventEmitter<Location>;

  constructor (
    private mapGeneratorService: MapGeneratorService
  ) { }

  newGame() {
    this.currentLocation = null;
    this.currentLocation = this.mapGeneratorService.resetMap();
    this.newMap.emit(this.currentLocation);
  }

}
