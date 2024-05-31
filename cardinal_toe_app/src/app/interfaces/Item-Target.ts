import { Item } from "./Item"

export interface ItemTarget {
    targetAlias: string,
    name: string,
    description: string,
    requiredItemAlias: Item,
    isCompleted: boolean,
}
