import { Injectable, OnInit } from '@angular/core';
import { Location } from '../../interfaces/Location';
import { LocationGeneratorService } from '../locator/location-generator.service';
import { NumberRandomiserService } from '../number-randomiser/number-randomiser.service';
import locationsJSON from '../../../assets/data/locations.json';

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
  private readonly DEPTH_LIMIT = 10;

  constructor ( 
    private locationGeneratorService: LocationGeneratorService, 
    private numberRandomiserService: NumberRandomiserService 
  ) { }

  /**
   * ???
   * @param depthValue      Tracks the number steps back to `rootLocation`.
   * @param deviationValue  Tracks number of steps back to _'winning route'_.
   * @param currentLocation ???
   * @param isCorrectRoute  OPTIONAL: tracks if `currentLocation` leads to `isFinalLocation` (i.e. is on the _'winning route'_).
   */
  generateMap(
      depthValue: number = 0, 
      deviationValue: number = 0,
      currentLocation: Location | null = null, 
    ): void {

      // If `currentLocation` not provided, generate first Location.
      if (!currentLocation) {
          currentLocation = this.locationGeneratorService.generateLocation(null, false, deviationValue);
      }

      // If `currentLocation` is the 'goal' or the current branch of the Location tree
      // is at the deviation limit, terminate the generation of Locations in the current branch.
      if (currentLocation.isFinalLocation === true || deviationValue > this.DEVIATION_LIMIT) {
          return;
      }

      /**
       * Randomised number of `routes` available at `currentLocation`.
       */
      const randomNumberOfRoutes = this.getRandomNumberOfRoutes();

      /**
       * Randomised index of the available `currentLocation.routes` is on the _'winning path'_.
       * All other routes are on branches that result in a dead-end.
       */
      const correctRouteIndex = this.numberRandomiserService.getRandomNumber(randomNumberOfRoutes) - 1;

      // For each of the newly created routes...
      for (let i = 0; i < randomNumberOfRoutes; i++) {

        // determine their deviationValue...
        let nextLocationDeviationValue = 0;
        if (i !== correctRouteIndex) {
            nextLocationDeviationValue = deviationValue++;
        }

        // then determine if they lead to the final Location...
        let isNextLocationFinalLocation = false;
        if (depthValue > this.DEPTH_LIMIT && deviationValue === 0) {
            isNextLocationFinalLocation = true;
        }

        // then generate the remaining data.
        let nextLocation = this.locationGeneratorService.generateLocation(currentLocation, isNextLocationFinalLocation, nextLocationDeviationValue);


        // The current and next Locations have a path between them, so add to one-another's routes.
        currentLocation.routes.push(nextLocation);
        nextLocation.routes.push(currentLocation);

        // Move to the nextLocation then start the loop again.
        currentLocation = nextLocation;
        this.generateMap(depthValue, deviationValue, currentLocation);
    }

    // Increase the depth value once all new routes have been iterated through to completion.
    depthValue++;

  }

  // iterateThroughRoutes(iterations: number, indexOfCorrectRoute: number, currentDeviation: number, currentDepth: number) {
  //   for (let i = 0; i < iterations; i++) {

  //     if (i !== indexOfCorrectRoute) {
  //         deviationValue++;
  //         isCorrectRoute = false;
  //     } else {
  //         isCorrectRoute = true;
  //     }

  //     let isFinalLocation = false;
  //     if (this.depthValue > this.DEPTH_LIMIT) {
  //         isFinalLocation = true;
  //     }

  //     let nextLocation = this.locationGeneratorService.generateLocation(currentLocation, isFinalLocation);

  //     nextLocation.previousLocation = currentLocation;
  //     currentLocation?.routes.push(nextLocation);
  //     currentLocation = nextLocation;
  //     this.generateMap(depthValue, deviationValue, currentLocation, isCorrectRoute);

  //   }
  // }

  /**
  * Returns a random `number` between `1` & `4` weighted towards 1.
  * @function
  */
  getRandomNumberOfRoutes(): number {
    const randomInt = this.numberRandomiserService.getRandomNumber(10);

    if (randomInt <= 4) {
        return 1;
    }

    if (randomInt <= 7) {
      return 2;
    }

    if (randomInt <= 9) {
        return 3;
    }

    return 4;
  }

}
