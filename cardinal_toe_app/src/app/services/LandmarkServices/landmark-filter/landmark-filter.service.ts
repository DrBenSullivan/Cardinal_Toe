import { Injectable } from '@angular/core';
import { NumberRandomiserService } from '../../UtilityServices/number-randomiser/number-randomiser.service';
import { Landmark } from '../../../interfaces/Landmark';
import { Location } from '../../../interfaces/Location';
import { ContentsService } from '../contents/contents.service';

@Injectable({
  providedIn: 'root'
})
export class LandmarkFilterService {

  constructor(
    private numberRandomiser: NumberRandomiserService,
    private contentsService: ContentsService
  ) { }

  filterLandmarks(location: Location): Landmark[] {
    // Input Location has all possible landmarks, these need to be filtered.
    const landmarkArr = location.landmarks;

    if (landmarkArr.length === 0) {
      return []
    }

    // If location isFinalLocation, will have only one landmark that contains the itemTarget otherwise randomise number.
    let numberOfLandmarks;
    if (location.isFinalLocation){
      numberOfLandmarks = 1;
    }
    else {
      numberOfLandmarks = this.getNumberOfLandmarks();
    }
    
    let filteredIndices: number[] = [];
    let landmarkIndex;

    // Populate an array of randomised indices to be used to populate returned string[].
    while (filteredIndices.length < numberOfLandmarks) {

      do {
        landmarkIndex = this.numberRandomiser.getRandomRoundedNumber(landmarkArr.length-1);
      } while (filteredIndices.includes(landmarkIndex))

      filteredIndices.push(landmarkIndex);
    } 

    const filteredArr: Landmark[] = [];

    // If this location isFinalLocation, it will contain an itemTarget in landmark.contents. Else it will be empty.
    if (location.isFinalLocation){
      console.log(location.name + "isFinalLocation, possible landmarks are:");
      for (let landmark of location.landmarks){
      }
      const _landmark: Landmark = {
        name: location.landmarks[0].name,
        contents: this.contentsService.getItemTarget(),
      }
      filteredArr.push(_landmark);
      console.log(_landmark.name + "is the final landmark");
    }

    else {
      for (let index of filteredIndices) {
        const _landmark: Landmark = {
          name: location.landmarks[index].name,
        }
        filteredArr.push(_landmark);
      }
    }

    return filteredArr
  }

  // Return a number weighted towards 0.
  getNumberOfLandmarks(): number {
    const randomInt = this.numberRandomiser.getRandomRoundedNumber(10);

    if (randomInt <= 5) {
      return 0
    }

    if (randomInt <= 7) {
      return 1
    }

    if (randomInt <= 9) {
      return 2
    }

    return 3
  }
}
