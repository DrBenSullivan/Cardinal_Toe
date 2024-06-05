import { Injectable } from '@angular/core';
import { NumberRandomiserService } from '../../UtilityServices/number-randomiser/number-randomiser.service';

@Injectable({
  providedIn: 'root'
})
export class LandmarkSentenceService {

  constructor (
    private numberRandomiser: NumberRandomiserService
  ) {}

  getSentences(numberRequired: number): string[] {
    if (numberRequired === 0) {
      return []
    }

    const indexArr: number[] = [];
    const sentencesArray: string[] = [];

    for (let i=0; i<numberRequired; i++) {
      let sentenceIndex = null;
      while (!sentenceIndex || indexArr.includes(sentenceIndex)) {
        sentenceIndex = this.numberRandomiser.getRandomCeilNumber(this.possibleSentences.length - 1);
      }
      indexArr.push(sentenceIndex);
      sentencesArray.push(this.possibleSentences[sentenceIndex]);
    }

    return sentencesArray
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
