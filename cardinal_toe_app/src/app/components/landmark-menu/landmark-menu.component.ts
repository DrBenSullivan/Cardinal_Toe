import { Component, Input, OnChanges } from '@angular/core';
import { ItemTarget } from '../../interfaces/Item-Target';
import { Landmark } from '../../interfaces/Landmark';
import { NgIf, TitleCasePipe } from '@angular/common';

@Component({
  selector: 'app-landmark-menu',
  standalone: true,
  imports: [ TitleCasePipe, NgIf ],
  templateUrl: './landmark-menu.component.html',
  styleUrl: './landmark-menu.component.scss'
})

export class LandmarkMenuComponent implements OnChanges {
  @Input() landmarkWithTarget!: Landmark; 

  currentItemTarget!: ItemTarget;

  constructor() {}
  
  ngOnChanges() {
    this.currentItemTarget = this.landmarkWithTarget.contents[0];
  }


}
