import { Injectable } from '@angular/core';
import { Location } from '../../../interfaces/Location';
import { Item } from '../../../interfaces/Item';
import { SessionState } from '../../../interfaces/Session-State';
import { MapGeneratorService } from '../../LocationServices/map-generator/map-generator.service';

@Injectable({
  providedIn: 'root'
})
export class SessionStateService {
  sessionState!: SessionState;

  constructor (private mapGenerator: MapGeneratorService){}

  /***************************************************
   * Saves current `Location` in `gameState` variable
   * @param location `Location` to be saved.
   ***************************************************/
  saveMapState(location: Location): void {
    this.sessionState.map = location
  }

  /*****************************
   * Retrieves saved `gameState`
   * @returns Saved `Location`
   *****************************/
  getMapState(): Location {
    return this.sessionState.map;
  }

  /***************************************
   * Checks if there is a saved `gameState`
   * @returns `boolean`
   ***************************************/
  checkIfNewSession(): SessionState {
    if (!this.sessionState) {
      this.sessionState = {
        map: this.mapGenerator.getMap(),
        itemSearchList: [],
        inventory: [],
        isVictoryConditionMet: false
      }
    }
    
    return this.sessionState;
  }

  addItemToSearchList(item: Item){
    console.log("Adding ", item.itemAlias, " to searchList");
    this.sessionState.itemSearchList.push(item);
  }

  addToInventory(item: Item){
    console.log("Adding ", item.itemAlias, " to inventory");
    this.sessionState.inventory.push(item);
  }

  searchForItems(): void {
    for (let i = 0; i < this.sessionState.itemSearchList.length; i++){
      this.sessionState.itemSearchList[i].searchCountdown--;
      console.log(this.sessionState.itemSearchList[i].itemAlias, " in searchList's countdown = ", this.sessionState.itemSearchList[i].searchCountdown);
      if (this.sessionState.itemSearchList[i].searchCountdown == 0) {
        console.log(this.sessionState.itemSearchList[i].itemAlias, " in searchList's countdown = 0, adding item to inventory");
        this.sessionState.inventory.push(this.sessionState.itemSearchList[i]);
        this.sessionState.itemSearchList.splice(i, 1);
        console.log(this.sessionState.inventory[this.sessionState.inventory.length].itemAlias, " added to inventory");
      }
    }
  }

  newGame(): SessionState {
    this.sessionState = {
      map: this.mapGenerator.getMap(),
      itemSearchList: [],
      inventory: [],
      isVictoryConditionMet: false
    }
    return this.sessionState
  }

}


