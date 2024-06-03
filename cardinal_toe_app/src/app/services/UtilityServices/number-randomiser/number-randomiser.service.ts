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
  getRandomCeilNumber = (max: number): number => Math.ceil(Math.random() * max)

  /**
  * Returns a pseudorandom `number` between `0` and `max`.
  * @function
  * @param {number} max `REQUIRED`
  */
  getRandomRoundedNumber = (max: number): number => Math.ceil(Math.random() * max)
      
}

