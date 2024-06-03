import { Injectable } from '@angular/core';
import { NumberRandomiserService } from '../../UtilityServices/number-randomiser/number-randomiser.service';
import { ItemTarget } from '../../../interfaces/Item-Target';
import ItemTargetJSON from '../../../../assets/data/itemTargets.json'
import ItemJSON from '../../../../assets/data/items.json'
import { Item } from '../../../interfaces/Item';

@Injectable({
  providedIn: 'root'
})
export class ContentsService {

  DEFAULT_ITEM_COUNTDOWN: number = 4;

  constructor(
    private numberRandomiser: NumberRandomiserService
  ) { }

  getItemTarget(): ItemTarget[] {
    const randomIndex = this.numberRandomiser.getRandomRoundedNumber(ItemTargetJSON.length) - 1;
    const JSONItemTarget = ItemTargetJSON[randomIndex];
    const _requiredItem = this.getRequiredItem(JSONItemTarget.alias);
    return [{
      targetAlias: JSONItemTarget.alias,
      name: JSONItemTarget.name,
      description: JSONItemTarget.description,
      completedDescription: JSONItemTarget.completedDescription,
      requiredItem: _requiredItem,
      isCompleted: false,
    }]
  }

  // Gets the item according to the input itemTarget alias.
  getRequiredItem(_itemTargetAlias: string): Item {
    const JSONItem = ItemJSON.find(i => i.itemTargetAlias == _itemTargetAlias)!;
    return {
      itemAlias: JSONItem.itemAlias,
      name: JSONItem.name,
      description: JSONItem.description,
      itemTargetAlias: JSONItem.itemTargetAlias,
      searchCountdown: this.DEFAULT_ITEM_COUNTDOWN
    }
  }
}
