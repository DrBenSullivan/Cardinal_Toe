import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Place } from '../../interfaces/place';
import { UpperCasePipe } from '@angular/common';
import { LocationMenuComponent } from '../location-menu/location-menu.component';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';

@Component({
  selector: 'app-narrator',
  standalone: true,
  imports: [ UpperCasePipe, LocationMenuComponent, ButtonModule, DialogModule ],
  templateUrl: './narrator.component.html',
  styleUrl: './narrator.component.scss'
})

export class NarratorComponent {
  @Input() node: Place = {
    scene: "",
    description: "",
    image: "",
  }
    display: boolean = false;
    label: string = "";
    location1: string = "forest"; //EDIT THIS FOR RANDOMISATION
    character1: string = "Bazzlebeard";

  openMenu(value: string) {
    this.display = true;
    this.label = value;
  }
  
  onMenuClose(event: boolean) {
    this.display = event;
    this.label = "";
  }

}
