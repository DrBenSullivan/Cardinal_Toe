import { Component, OnInit } from '@angular/core';
import { Place } from '../../interfaces/place';
import { NarratorComponent } from '../narrator/narrator.component';
import { LocatorService } from '../../services/locator/locator.service'


@Component({
  selector: 'app-content',
  standalone: true,
  imports: [ NarratorComponent ],
  templateUrl: './content.component.html',
  styleUrls: ['./content.component.scss']
})
export class ContentComponent implements OnInit {
  node: Place = {
    id: 0,
    scene: "",
    description: "",
    routes: [],
  }

  constructor(private locatorService: LocatorService){
  }

  ngOnInit() {
    this.node = this.locatorService.getLocationDetails(this.node.id);
    }
}