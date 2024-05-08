import { Injectable } from '@angular/core';
import { NumberRandomiserService } from '../number-randomiser/number-randomiser.service';

@Injectable({
  providedIn: 'root'
})
export class LandmarkFilterService {

  constructor(
    private numberRandomiser: NumberRandomiserService
  ) { }

  filterLandmarks(landmarkArr: string[]): string[] {
    if (landmarkArr.length === 0) {
      return []
    }

    let filteredIndices: number[] = [];
    let landmarkIndex;

    // Get weighted number of landmarks to include in returned array.
    const numberOfLandmarks = this.getNumberOfLandmarks();

    if (numberOfLandmarks === 5) {
      filteredIndices = [0,1,2,3,4];
    }
    
    // Populate an array of randomised indices to be used to populate returned string[].
    while (filteredIndices.length < numberOfLandmarks) {
      while (!landmarkIndex || filteredIndices.includes(landmarkIndex)) {
        landmarkIndex = this.numberRandomiser.getRandomRoundedNumber(landmarkArr.length-1);
      }
      filteredIndices.push(landmarkIndex);
    } 

    const filteredArr: string[] = [];
    for (let index of filteredIndices) {
      filteredArr.push(landmarkArr[index]);
    }

    return filteredArr
  }

  // Return a number weighted towards 1.
  getNumberOfLandmarks(): number {
    const randomInt = this.numberRandomiser.getRandomRoundedNumber(10);

    if (randomInt <= 1) {
      return 0
    }

    if (randomInt <= 5) {
      return 1
    }

    if (randomInt <= 7) {
      return 2
    }

    if (randomInt <= 8) {
      return 3
    }
    
    if (randomInt <= 9) {
      return 4
    }

    return 5
  }
}
