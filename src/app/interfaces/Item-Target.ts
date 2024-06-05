import { Item } from "./Item"

export interface ItemTarget {
    targetAlias: string,
    name: string,
    description: string,
    completedDescription: string,
    requiredItem: Item,
    isCompleted: boolean,
}
