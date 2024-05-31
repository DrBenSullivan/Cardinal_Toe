import { Injectable } from '@angular/core';
import { Location } from '../../../interfaces/Location';
import { Landmark } from '../../../interfaces/Landmark';
import { NumberRandomiserService } from '../../UtilityServices/number-randomiser/number-randomiser.service';
import locationsJSON from '../../../../assets/data/locations.json';
import { LandmarkFilterService } from '../../LandmarkServices/landmark-filter/landmark-filter.service';

@Injectable({
  providedIn: 'root'
})

export class LocationGeneratorService {

  constructor ( 
    private numberRandomiserService: NumberRandomiserService,
    private landmarkFilterService: LandmarkFilterService
  ) {}

  /**
 * Stores locations that have been used to prevent repetition in map.
 */
  private usedLocationKeys: number[] = [];

  resetLocationKeys() {
    this.usedLocationKeys = [];
  }

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
    deviation: number = 0
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
        locationKeyToLookup = this.numberRandomiserService.getRandomCeilNumber(locationsJSON.length - 1);
      }
      this.usedLocationKeys.push(locationKeyToLookup);
    }

    // Populate data from locationsJSON & return as a `Location`.
    const locationDetails = locationsJSON[locationKeyToLookup];

    // Get this location's landmarks.
    const locationLandmarks: Landmark[] = [];
    for (let i = 0; i < locationDetails.landmarks.length; i++)
      {
        locationLandmarks.push({
          name: locationDetails.landmarks[i]
        })
      }

    // Generate Location typed object.
    const locationObject: Location = {
        name: locationDetails.name,
        description: locationDetails.description,
        blurb: locationDetails.blurb ?? undefined,
        previousLocation: previousLocation ?? null,
        isFinalLocation: finalLocationBoolean,
        routes: [],
        deviationValue: deviation,
        hasBeenSearched: false,
        landmarks: locationLandmarks
    };

    // Filter Landmarks using service.
    locationObject.landmarks = this.landmarkFilterService.filterLandmarks(locationObject);
    
    return locationObject
  }
}
