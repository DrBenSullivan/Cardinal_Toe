import { Injectable } from '@angular/core';
import { Location } from '../../interfaces/Location';
import { LocationGeneratorService } from '../LocationServices/location-generator/location-generator.service';
import { NumberRandomiserService } from '../UtilityServices/number-randomiser/number-randomiser.service';

@Injectable({
  providedIn: 'root'
})
export class MapGeneratorService {
  
  // Declare constants
  /**
   * Sets the limit of the number of nodes (or, distance) that can be generated in the node tree
   * away from the _'winning route'_.
   * @private
   * @readonly
   * @constant
   */
  private readonly DEVIATION_LIMIT = 3;
  /**
   * Sets the limit of the number of Locations (i.e. distance) that can be generated in the Location tree
   * before reaching the _'goal Location'_.
   * @private
   * @readonly
   * @constant
   */
  private readonly DEPTH_LIMIT = 4;

  rootLocation!: Location;

  constructor ( 
    private locationGeneratorService: LocationGeneratorService, 
    private numberRandomiserService: NumberRandomiserService 
  ) { }

  /*******************************************
   * Resets map only if one already exists.
   * @returns `Location`: newly-generated map.
   *******************************************/
  resetMap(): Location {
    if (this.rootLocation) {
      this.locationGeneratorService.resetLocationKeys();
      console.log(`Getting map...`);
      this.generateMap(0, null);
    }

    return this.rootLocation
  }

  getMap(): Location {
    console.log(`Getting map...`);

    if(this.rootLocation == null) {
      this.generateMap();
    }
    
    console.log(this.rootLocation)
    return this.rootLocation
  }

  /************************************************************************
   * Generates map. If parameters empty, builds new map from scratch. Also
   * used with parameters to build map iteratively.
   * @param depthValue      Tracks the number steps back to `rootLocation`.
   * @param currentLocation The `Location` upon which we're building.
   ***********************************************************************/
  generateMap (
      depthValue: number = 0, 
      currentLocation: Location | null = null 
    ) {
      // Generate first `Location` if `currentLocation` not provided i.e. first iteration.
      if (!currentLocation) {
        currentLocation = this.locationGeneratorService.generateLocation(null, false, 0);
        this.rootLocation = currentLocation;
      }

      // If `currentLocation` is the 'goal' or the current branch of the Location tree is at
      // the deviation limit, terminate the generation of Locations in the current branch.
      if ((currentLocation.isFinalLocation === true) 
        || (currentLocation.deviationValue === this.DEVIATION_LIMIT)
        || (depthValue === this.DEPTH_LIMIT)) {
        return
      }

      // Glade should have only one route.
      let numberOfRoutes = 1;
      let correctRouteIndex = 0;
      
      // All other Locations should have randomised number of routes.
      // One of those routes randomly selectd to be the correct route.
      if (currentLocation.previousLocation) {
        /**
         * Randomised number of `routes` available at `currentLocation`.
         */
        numberOfRoutes = this.getRandomNumberOfRoutes();

        // Only Locations on the correct path can have a correct route, if not on the correct path,
        // the correct route would be the `previousLocation`. As such, only select the 'correctRoute`
        // if currentLocation is on the correct path i.e. deviation = 0.
        if (currentLocation.deviationValue == 0) {
          /**
           * Randomised index of the available `currentLocation.routes` is on the _'winning path'_.
           * All other routes are on branches that result in a dead-end.
           */
          correctRouteIndex = (this.numberRandomiserService.getRandomCeilNumber(numberOfRoutes) - 1);
        }
      }

    // For the newly create routes... 
    for (let i = 0; i < numberOfRoutes; i++) {
      // If the index number is incorrect, their target Location's `deviationValue` increases.
      let nextLocationDeviationValue = currentLocation.deviationValue;
      if (i !== correctRouteIndex) { 
        nextLocationDeviationValue++;
      }

      // then determine if they lead to the final Location...
      let isNextLocationFinalLocation = false;
      if ((depthValue + 1 === this.DEPTH_LIMIT) 
         && (nextLocationDeviationValue === 0)) {
        isNextLocationFinalLocation = true;
      }

      // then generate the remaining data.
      let nextLocation = this.locationGeneratorService.generateLocation(currentLocation, isNextLocationFinalLocation, nextLocationDeviationValue);
      currentLocation.routes.push(nextLocation);
    }

    // Restart the loop with a raised depthValue
    for (let route of currentLocation.routes) {
      this.generateMap(depthValue +1, route);
    }

  }

  /**
  * Returns a pseudorandom `number` between `1` & `4` weighted toward 2.
  * @function
  */
  getRandomNumberOfRoutes(): number {
    const randomInt = this.numberRandomiserService.getRandomCeilNumber(10);

    if (randomInt <= 2) {
      return 1;
    }

    if (randomInt <= 6) {
      return 2;
    }

    if (randomInt <= 9) {
      return 3;
    }

    return 4;
  }
} 