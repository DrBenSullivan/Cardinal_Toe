import { Injectable } from '@angular/core';
import { Location } from '../../interfaces/Location';

@Injectable({
  providedIn: 'root'
})

export class RouteTextGeneratorService {

  getRoutesText(routesArray: Location[]): string {
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
