  import { Injectable } from '@angular/core';
import { LocatorService } from '../locator/locator.service';
import { Place } from '../../interfaces/place';

@Injectable({
  providedIn: 'root'
})
export class DestinationsService {

  constructor(private locatorService: LocatorService) { }

  getDestinations(place: Place, objectArray: Place[], sceneArray: string[]) {
    this.fillDestinationArrays(place, objectArray, sceneArray);
    return this.getDestinationText(objectArray);
  }

  fillDestinationArrays(place: Place, objectArray: object[], sceneArray: string[]) {
    if(!place.routes) {
      return
    } 
    for (let i=0; i<place.routes.length; i++) {
      const destination: Place = this.locatorService.getLocationDetails(place.routes[i]);
      objectArray.push(destination);
      if (destination.scene) {
        sceneArray.push(destination.scene);
      } 
    }
  }

  getDestinationText(objectArray: Place[]) {
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
