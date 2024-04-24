import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class NumberRandomiserService {

      /**
  * Returns a pseudorandom `number` between `0` and `max`.
  * @function
  * @param {number} max `REQUIRED`
  */
      getRandomNumber = (max: number): number => Math.floor(Math.random() * max);
      
}
