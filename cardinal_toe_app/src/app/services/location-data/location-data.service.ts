// This service is used to fetch other data that is not otherwise passed between components.

import { Injectable } from '@angular/core';
import locationsJSON from '../../../assets/data/locations.json'
import { Location } from '../../interfaces/Location';

@Injectable({
  providedIn: 'root'
})
export class LocationDataService {

  fetchLandmarks(location: Location) : string[] {
    const currentLocation = locationsJSON.find(
      locationData => locationData.name === location.name
    )
    if (currentLocation?.landmarks) {
      return currentLocation.landmarks
    }
    else {
      return [];
    }
  }
}
