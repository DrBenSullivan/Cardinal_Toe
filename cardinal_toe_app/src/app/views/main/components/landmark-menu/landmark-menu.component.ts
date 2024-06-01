import { Component, EventEmitter, Input, OnChanges, Output } from '@angular/core';
import { ItemTarget } from '../../../../interfaces/Item-Target';
import { Landmark } from '../../../../interfaces/Landmark';
import { NgIf, TitleCasePipe } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { ParagraphPipe } from '../../../../pipes/paragraph/paragraph.pipe';
import { DialogModule } from 'primeng/dialog';

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
  
  ngOnChanges() {
    this.currentItemTarget = this.landmarkWithTarget.contents[0];
  }

  closePopup(){
    this.display = false;
    this.changeDisplay.emit(this.display);
  }

}
