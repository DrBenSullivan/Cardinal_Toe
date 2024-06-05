import { Location } from "./Location";
import { Item } from "./Item";

export interface Player {
    map: Location[];
    inventory: Item[];
}
