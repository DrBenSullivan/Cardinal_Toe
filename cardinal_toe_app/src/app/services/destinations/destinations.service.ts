import { Injectable } from '@angular/core';
import { Location } from '../../interfaces/Location';

@Injectable({
  providedIn: 'root'
})

export class DestinationsService {

  // constructor(private locationGeneratorService: LocationGeneratorService) { }

  // getDestinations(place: Location, objectArray: Location[], nameArray: string[]) {
  //   this.fillDestinationArrays(place, objectArray, nameArray);
  //   return this.getDestinatxionText(objectArray);
  // }

  // fillDestinationArrays(place: Location, objectArray: object[], nameArray: string[]) {
  //   if(!place.routes) {
  //     return
  //   } 
  //   for (let i=0; i<place.routes.length; i++) {
  //     const destination: Location = this.locationGeneratorService.getLocationDetails(place.routes[i]);
  //     objectArray.push(destination);
  //     if (destination.name) {
  //       nameArray.push(destination.name);
  //     } 
  //   }
  // }

  getDestinationText(routesArray: Location[]): string {
    let outputText = "";

    if (routesArray.length === 0) {
      outputText = "You can see no exit. Alas, your story ends. Please call again, traveller, to begin your adventure once more."
    }

    if (routesArray.length === 1) {
      outputText = "The only path away from this place appears to lead to a "
    }

    if (routesArray.length === 2) {
      outputText = "You can go one of two ways. A "
    }

    if (routesArray.length > 2) {
      outputText = "There are multiple routes that you can take from here. Take your pick: a "
    }
    
    return outputText;
  }
}
