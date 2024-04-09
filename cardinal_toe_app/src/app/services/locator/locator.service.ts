import { Injectable } from '@angular/core';
import locationsJSON from '../../../assets/data/locations.json';
import { Place } from '../../interfaces/place';

@Injectable({
  providedIn: 'root'
})
export class LocatorService {
  constructor() {
  }
  
  getLocationDetails(key: number): Place {
    const locationDetails = locationsJSON[key];
    const nodeObject: Place = {
        id: key,
        scene: locationDetails.name,
        description: locationDetails.description,
        blurb: locationDetails.blurb,
        routes: locationDetails.routes
    };
    return nodeObject;
  }
}
