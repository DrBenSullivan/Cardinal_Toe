import { Injectable } from '@angular/core';
import { Location } from '../../../interfaces/Location';
import { Item } from '../../../interfaces/Item';
import { SessionState } from '../../../interfaces/Session-State';
import { MapGeneratorService } from '../../LocationServices/map-generator/map-generator.service';
import { ItemTarget } from '../../../interfaces/Item-Target';

@Injectable({
  providedIn: 'root'
})
export class SessionStateService {
  sessionState!: SessionState;

  QUESTS_REQUIRED_TO_WIN = 1;

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
    return this.sessionState.map
  }

  getSessionState(): SessionState {
    return this.sessionState
  }

  /***************************************
   * Checks if there is a saved `gameState`
   * @returns `boolean`
   ***************************************/
  checkIfNewSession(): SessionState {
    if (!this.sessionState) {
      this.sessionState = this.newGame();
    }
    
    return this.sessionState;
  }

  addItemToSearchList(item: Item){
    console.log("Adding ", item.itemAlias, " to searchList");
    this.sessionState.encounteredItems.push(item.itemAlias);
    this.sessionState.itemSearchList.push(item);
  }

  isItemEncountered(item: Item): boolean {
    return this.sessionState.encounteredItems.includes(item.itemAlias);
  }

  isInInventory(item: Item): boolean {
    return this.sessionState.inventory.includes(item);
  } 

  completeItemTarget(_target: ItemTarget): boolean {
    const _item = _target.requiredItem;
    const _inventoryIndex = this.sessionState.inventory.indexOf(_item);
    this.sessionState.inventory.splice(_inventoryIndex, 1);
    let isMethodSuccessful: boolean = false;

    for (let landmark of this.sessionState.map.landmarks) {
      for (let itemTarget of landmark.contents){
        if (itemTarget = _target) {
          itemTarget.isCompleted = true;
          this.sessionState.questsCompleted++;
          isMethodSuccessful = true;
          break;
        }
      }
    }

    return isMethodSuccessful
    
  }
  

  addToInventory(item: Item){
    console.log("Adding ", item.itemAlias, " to inventory");
    this.sessionState.inventory.push(item);
  }

  searchForItems(): Item[] {
    let itemsFound: Item[] = [];
    for (let i = 0; i < this.sessionState.itemSearchList.length; i++){
      this.sessionState.itemSearchList[i].searchCountdown--;
      console.log(this.sessionState.itemSearchList[i].itemAlias, " in searchList's countdown = ", this.sessionState.itemSearchList[i].searchCountdown);


      if (this.sessionState.itemSearchList[i].searchCountdown == 0) {
        console.log(this.sessionState.itemSearchList[i].itemAlias, " in searchList's countdown = 0, adding item to inventory");
        this.sessionState.inventory.push(this.sessionState.itemSearchList[i]);
        itemsFound.push(this.sessionState.itemSearchList[i]);
        this.sessionState.itemSearchList.splice(i, 1);
        console.log(this.sessionState.inventory[this.sessionState.inventory.length -1].itemAlias, " added to inventory");
      }
    }

    return itemsFound;
  }

  checkIfGameOver(): void {
    if (this.sessionState.questsCompleted === this.QUESTS_REQUIRED_TO_WIN){
      this.sessionState.isVictoryConditionMet = true;
    }
  }

  newGame(): SessionState {
    this.sessionState = {
      map: this.mapGenerator.getMap(),
      itemSearchList: [],
      inventory: [],
      isVictoryConditionMet: false,
      encounteredItems: [],
      questsCompleted: 0
    }
    return this.sessionState
  }

}


