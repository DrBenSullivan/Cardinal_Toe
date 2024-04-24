import { Injectable } from '@angular/core';
import { LocationGeneratorService } from '../locator/location-generator.service';
import { Location } from '../../interfaces/Location';
import locationsJSON from '../../../assets/data/locations.json';

@Injectable({
  providedIn: 'root'
})

export class DestinationsService {

  constructor(private locationGeneratorService: LocationGeneratorService) { }

  getDestinations(place: Location, objectArray: Location[], nameArray: string[]) {
    this.fillDestinationArrays(place, objectArray, nameArray);
    return this.getDestinationText(objectArray);
  }

  fillDestinationArrays(place: Location, objectArray: object[], nameArray: string[]) {
    if(!place.routes) {
      return
    } 
    for (let i=0; i<place.routes.length; i++) {
      const destination: Location = this.locationGeneratorService.getLocationDetails(place.routes[i]);
      objectArray.push(destination);
      if (destination.name) {
        nameArray.push(destination.name);
      } 
    }
  }

  getDestinationText(objectArray: Location[]) {
    let outputText = "";
    if (objectArray.length === 0) {
      outputText = "You can see no exit. Alas, your story ends. Please call again, traveller, to begin your adventure once more."
    }
    if (objectArray.length === 1 && objectArray[0].id === 0) {
      outputText = "The only path away from this place appears to lead to a "
    }
    if (objectArray.length === 1 && objectArray[0].id !== 0) {
      outputText = "You can only see one route out: the route to a "
    }
    if (objectArray.length === 2) {
      outputText = "You can go one of two ways. A "
    }
    if (objectArray.length > 2) {
      outputText = "There are multiple routes that you can take from here. Take your pick: a "
    }
    return outputText;
  }
}
