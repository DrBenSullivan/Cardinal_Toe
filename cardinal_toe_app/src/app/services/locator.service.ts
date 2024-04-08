import { Injectable } from '@angular/core';
import locationsJSON from '../../assets/locations.json';
import { Place } from '../interfaces/place';

@Injectable({
  providedIn: 'root'
})
export class LocatorService {
  constructor() {
    console.log(locationsJSON);
  }
  
  getLocationDetails(key: number){
    const locationDetails = locationsJSON.locations[key];
    const nodeObject: Place = {
      id: locationDetails.id,
      scene: locationDetails.name,
      description: locationDetails.description,
      image: locationDetails.image
    }
    return nodeObject
  }
}
