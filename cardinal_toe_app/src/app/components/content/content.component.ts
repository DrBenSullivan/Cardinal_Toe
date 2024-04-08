import { Component, OnInit } from '@angular/core';
import { Input } from '@angular/core';
import { Place } from '../../interfaces/place';
import { NarratorComponent } from '../narrator/narrator.component';
import { LocatorService } from '../../services/locator.service'


@Component({
  selector: 'app-content',
  standalone: true,
  imports: [ NarratorComponent ],
  templateUrl: './content.component.html',
  styleUrls: ['./content.component.scss']
})
export class ContentComponent implements OnInit {
  node: Place = {
    id: 0
  }

  constructor(private locatorService: LocatorService){
  }

  ngOnInit() {
    this.node = this.locatorService.getLocationDetails(this.node.id);
    console.log(typeof(this.node.description));
    }
}