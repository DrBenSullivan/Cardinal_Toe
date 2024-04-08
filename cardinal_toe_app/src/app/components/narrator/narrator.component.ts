import { Component, Input } from '@angular/core';
import { Place } from '../../interfaces/place';
import { CommonModule } from '@angular/common';
import { LocationMenuComponent } from '../location-menu/location-menu.component';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { ParagraphPipe } from '../../pipes/paragraph.pipe';

@Component({
  selector: 'app-narrator',
  standalone: true,
  imports: [ LocationMenuComponent, ButtonModule, DialogModule, CommonModule, ParagraphPipe ],
  templateUrl: './narrator.component.html',
  styleUrl: './narrator.component.scss'
})

export class NarratorComponent {
  constructor(){}
  @Input() node!: Place;

    displayPopup: boolean = false;
    header: string = ""; //Header for popup

  openPopup(linkText: string) {
    this.displayPopup = true;
    this.header = linkText;
  }

}
