import { Injectable } from '@angular/core';
import { Location } from '../../interfaces/Location';
import { NumberRandomiserService } from '../number-randomiser/number-randomiser.service';
import locationsJSON from '../../../assets/data/locations.json';

@Injectable({
  providedIn: 'root'
})

export class LocationGeneratorService {

  constructor ( 
    private numberRandomiserService: NumberRandomiserService
  ) {}

    /**
   * Stores locations that have been used to prevent repetition in map.
   */
    private usedLocationKeys: number[] = [];

    /**
   * Retrieves `name`, `description` & `blurb` from `locations.json`, if they exist.
   * 
   * @param previousLocation The Location that the generated Location branches from.
   * @param finalLocationBoolean Is generated Location the final ('_goal_') Location.
   * @returns Generated `Location`.
   */
  generateLocation(
    previousLocation: Location | null,
    finalLocationBoolean: boolean,
    deviation: number,
  ): Location {

    let locationKeyToLookup = null;


    // Forces the first & second generated locations to be "Glade", followed by "Forest".
    if (this.usedLocationKeys.length < 2) {
      locationKeyToLookup = this.usedLocationKeys.length;
      this.usedLocationKeys.push(locationKeyToLookup);
    }


    // Randomises locationKeyToLookup until an unused key is generated.
    else {
  
      while (!locationKeyToLookup || this.usedLocationKeys.includes(locationKeyToLookup)) {
        locationKeyToLookup = this.numberRandomiserService.getRandomNumber(locationsJSON.length - 1);
      }

      this.usedLocationKeys.push(locationKeyToLookup);

    }

    const locationDetails = locationsJSON[locationKeyToLookup];

    const locationObject: Location = {
        name: locationDetails.name,
        description: locationDetails.description,
        blurb: locationDetails.blurb || undefined,
        previousLocation: previousLocation || null,
        isRootLocation: previousLocation ? false : true,
        isFinalLocation: finalLocationBoolean,
        routes: [],
        deviationValue: deviation
    };

    return locationObject
  }
}
