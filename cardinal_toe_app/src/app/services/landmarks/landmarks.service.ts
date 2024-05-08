import { Injectable } from '@angular/core';
import { NumberRandomiserService } from '../number-randomiser/number-randomiser.service';
import { LocationDataService } from '../location-data/location-data.service';
import { Location } from '../../interfaces/Location';

@Injectable({
  providedIn: 'root'
})
export class LandmarksService {

  constructor (
    private numberRandomiser: NumberRandomiserService
  ) {}

  getSentences(landmarkArray: string[]): string[] {
    if (landmarkArray.length == 0) {
      return ["ERROR"]
    }

    const indexArr: number[] = [];
    const sentencesArray: string[] = [];

    for (let landmark of landmarkArray) {
      let sentenceIndex = null;
      while (!sentenceIndex || indexArr.includes(sentenceIndex)) {
        sentenceIndex = this.numberRandomiser.getRandomNumber(this.possibleSentences.length - 1);
      }
      indexArr.push(sentenceIndex);
      sentencesArray.push(this.possibleSentences[sentenceIndex]);
    }

    return sentencesArray
  }

  filterLandmarks(landmarkArr: string[]): string[] {
    if (landmarkArr.length === 0) {
      return []
    }
    const filteredIndices: number[] = [];
    let landmarkIndex;

    // Get weighted number of landmarks to include in returned array.
    const numberOfLandmarks = this.getNumberOfLandmarks();

    // Populate an array of randomised indices to be used to populate returned string[].
    while (filteredIndices.length < numberOfLandmarks) {
      while (!landmarkIndex || filteredIndices.includes(landmarkIndex)) {
        landmarkIndex = this.numberRandomiser.getRandomNumber(5);
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
    const randomInt = this.numberRandomiser.getRandomNumber(10);

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

  // Array of potential sentences to accompany landmarks.
  possibleSentences = [
    "To the North, you spot ",
    "On the East-side of the area, there is ",
    "South of your position, there seems to be ",
    "To the left, to the left, you see ",
    "WEST-SIDE holds ",
    "On the floor, there is ",
    "Wandering through the area, you stub your toe. F\%\*\#\! What is that\!\? Oh, it\'s ",
    "Ooooh, at... roughly eye-level? You can see ",
    "Something catches your eye, you brush away dirt and find ",
    "To your left, you notice ",
    "Over on the right is ",
    "How did you miss that! You seem to be standing on ",
    "Well butter my flapjacks. You've encountered ",
    "By Evarigon's beard! You've stumbled across "
  ];
}
