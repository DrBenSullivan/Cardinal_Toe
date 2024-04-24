import { Component, OnInit } from '@angular/core';
import { Location } from '../../interfaces/Location';
import { NarratorComponent } from '../narrator/narrator.component';
import { LocationGeneratorService } from '../../services/locator/location-generator.service'


@Component({
  selector: 'app-content',
  standalone: true,
  imports: [ NarratorComponent ],
  templateUrl: './content.component.html',
  styleUrls: ['./content.component.scss']
})
export class ContentComponent implements OnInit {
  node: Location = {
    id: 0,
    name: "",
    description: "",
    routes: [],
  }

  constructor(private locationGeneratorService: LocationGeneratorService){
  }

  ngOnInit() {
    this.node = this.locationGeneratorService.getLocationDetails(this.node.id);
    }
}