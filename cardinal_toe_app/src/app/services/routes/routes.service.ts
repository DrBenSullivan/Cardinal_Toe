import { Injectable } from '@angular/core';
import { Location } from '../../interfaces/Location';

@Injectable({
  providedIn: 'root'
})

export class RoutesService {

  getRoutes(currentLocation: Location): Location[] {
    const routesArray = Array.from(currentLocation.routes);
    
    if (currentLocation.previousLocation) {
        routesArray.push(currentLocation.previousLocation);
      }

    return routesArray
  }

  getRoutesText(routesArray: Location[]): string {
    switch (routesArray.length) {
      case 0:
        return "You can see no exit. Alas, traveller, your story ends here. Please call again, to begin your adventure once more."
      
      case 1:
        return "The only path away from this place appears to lead to "
      
      case 2:
        return "You can go one of two ways: "
      
      default:
        return "There are multiple routes that you can take from here. Take your pick: "
    }
  }
}
