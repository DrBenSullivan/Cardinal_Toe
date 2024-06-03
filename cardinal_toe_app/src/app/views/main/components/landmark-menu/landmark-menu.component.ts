import { Component, EventEmitter, Input, OnChanges, Output } from '@angular/core';
import { ItemTarget } from '../../../../interfaces/Item-Target';
import { Landmark } from '../../../../interfaces/Landmark';
import { NgIf, TitleCasePipe } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { ParagraphPipe } from '../../../../pipes/paragraph/paragraph.pipe';
import { DialogModule } from 'primeng/dialog';
import { SessionStateService } from '../../../../services/UtilityServices/session-state/session-state.service';
import { Item } from '../../../../interfaces/Item';

@Component({
  selector: 'app-landmark-menu',
  standalone: true,
  imports: [ TitleCasePipe, NgIf, ButtonModule, ParagraphPipe, DialogModule ],
  templateUrl: './landmark-menu.component.html',
  styleUrl: './landmark-menu.component.scss'
})

export class LandmarkMenuComponent implements OnChanges {
  @Input() display: boolean = false;
  @Input() landmarkWithTarget!: Landmark;
  @Output() changeDisplay = new EventEmitter<boolean>();
  currentItemTarget!: ItemTarget;
  isItemNew!: boolean;
  isItemInInventory!: boolean;
  isItemTargetCompleted!: boolean;

  constructor(
    private sessionStateService: SessionStateService
  ){}
  
  ngOnChanges() {
    this.currentItemTarget = this.landmarkWithTarget.contents[0];
    this.isItemNew = !this.sessionStateService.isItemEncountered(this.currentItemTarget.requiredItem);
    this.isItemInInventory = this.sessionStateService.isInInventory(this.currentItemTarget.requiredItem);
    this.isItemTargetCompleted = this.currentItemTarget.isCompleted;
  }

  addItemToSearchList(_item: Item){
    if (this.isItemNew) {
      this.sessionStateService.addItemToSearchList(_item);
      this.closePopup();
    }
  }

  useItem(){
    this.currentItemTarget.isCompleted = this.sessionStateService.completeItemTarget(this.currentItemTarget);    
  }


  closePopup(){
    this.sessionStateService.checkIfGameOver();
    this.display = false;
    this.changeDisplay.emit(this.display);
  }

}
