import { Input, Component, Output, EventEmitter, OnChanges, SimpleChanges } from '@angular/core';
import { Place } from '../../interfaces/place';
import { DialogModule } from 'primeng/dialog';
import { ButtonModule } from 'primeng/button';
import { NgIf, TitleCasePipe } from '@angular/common';

@Component({
  selector: 'app-location-menu',
  imports: [ DialogModule, ButtonModule, NgIf, TitleCasePipe ],
  standalone: true,
  templateUrl: './location-menu.component.html',
  styleUrls: ['./location-menu.component.scss']
})  
export class LocationMenuComponent implements OnChanges {
  @Input() display: boolean = false;
  @Input() selectedDestination?: Place | undefined;
  @Input() currentLocation?: boolean | undefined;
  @Output() changeDisplay = new EventEmitter<boolean>();
  @Output() changeNode = new EventEmitter<Place>();

  localDestination: Place | undefined;
  localCurrent: boolean | undefined;
  canSearch!: boolean | undefined;
  canGo!: boolean | undefined;


  ngOnChanges(changes: SimpleChanges): void {
    if (changes && this.selectedDestination) {
      this.localCurrent = this.currentLocation;
      this.canSearch = !this.localCurrent;
      this.canGo = this.localCurrent;
      this.localDestination = this.selectedDestination;
    } else {
      this.resetVariables();
    }
  }
  
  closePopup(){
    this.display = false;
    this.changeDisplay.emit(this.display);
    this.resetVariables();
  }

  goToDestination(){
    this.changeNode.emit(this.localDestination);
    this.closePopup();  
    this.resetVariables();
  }

  resetVariables(){
    this.localDestination = undefined;
    this.localCurrent = undefined;
  }
}
