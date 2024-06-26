import { Landmark } from "./Landmark";

export interface Location {
    name: string,
    description: string,
    blurb?: string,
    hasBeenSearched: boolean,
    previousLocation: Location | null,
    isFinalLocation: boolean,
    routes: Location[],
    deviationValue: number,
    landmarks: Landmark[],
}
