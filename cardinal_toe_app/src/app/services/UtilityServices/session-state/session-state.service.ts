import { Injectable } from '@angular/core';
import { Location } from '../../../interfaces/Location';

@Injectable({
  providedIn: 'root'
})
export class SessionStateService {
  gameState!: Location;

  /***************************************************
   * Saves current `Location` in `gameState` variable
   * @param location `Location` to be saved.
   ***************************************************/
  saveGameState(location: Location): void {
    this.gameState = location;
  }

  /*****************************
   * Retrieves saved `gameState`
   * @returns Saved `Location`
   *****************************/
  getGameState(): Location {
    return this.gameState;
  }

  /***************************************
   * Checks if there is a saved `gameState`
   * @returns `boolean`
   ***************************************/
  checkIfNewGame(): boolean {
    if (this.gameState) {
      return false
    }
    return true
  }

}


