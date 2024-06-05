import { Item } from "./Item";
import { Location } from "./Location";

export interface SessionState {
    map: Location,
    itemSearchList: Item[],
    inventory: Item[],
    isVictoryConditionMet: boolean,
    encounteredItems: string[],
    questsCompleted: number
}
