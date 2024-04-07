import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Place } from '../../interfaces/place';
import { CommonModule } from '@angular/common';
import { LocationMenuComponent } from '../location-menu/location-menu.component';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';

@Component({
  selector: 'app-narrator',
  standalone: true,
  imports: [ LocationMenuComponent, ButtonModule, DialogModule, CommonModule ],
  templateUrl: './narrator.component.html',
  styleUrl: './narrator.component.scss'
})

export class NarratorComponent {
  constructor(){}
  @Input() node: Place = {
    scene: "",
    description: "",
    image: "",
  }
    displayPopup: boolean = false;
    header: string = ""; //Header for popup

    //Hard-coded for now...
    location1: string = "forest"
    character1: string = "Bazzlebeard";

  openPopup(linkText: string) {
    this.displayPopup = true;
    this.header = linkText;
  }
  
  onHide(event: boolean) {
    this.header = "";
  }

}
