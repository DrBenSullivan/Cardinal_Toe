import { Component, OnInit } from '@angular/core';
import { Input } from '@angular/core';
import { Place } from '../../interfaces/place';
import { NarratorComponent } from '../narrator/narrator.component';


@Component({
  selector: 'app-content',
  standalone: true,
  imports: [ NarratorComponent ],
  templateUrl: './content.component.html',
  styleUrls: ['./content.component.scss']
})
export class ContentComponent implements OnInit {
  @Input() node!: Place;

  constructor(){}

  ngOnInit() {
    this.node = {
      scene: "glade",
      description: "You come to your senses in a small forest clearing.<br>Brilliant beams of sunlight pierce the soft mist of the glade.<br>Your recollection of preceding events is, at best, questionable & the cloying scent of Buckfast burns your nostrils.<br>You know your friend <b class=\"person\" (click)=\"toggleMenu()\">Bazzlebeard</b> is in trouble, so you arise to find him.<br>The wall of trees that make up the <b class=\"location\" (click)=\"toggleMenu()\">forest</b>, surrounds you...",
      image: "https://images.pexels.com/photos/10116426/pexels-photo-10116426.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
    }
  }


}