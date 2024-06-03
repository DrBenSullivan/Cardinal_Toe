import { Item } from "./Item"

export interface ItemTarget {
    targetAlias: string,
    name: string,
    description: string,
    requiredItem: Item,
    isCompleted: boolean,
}
