export interface Location {
    name: string,
    description: string,
    blurb?: string,
    hasBeenSearched: boolean,
    previousLocation: Location | null,
    isFinalLocation: boolean,
    routes: Location[],
    deviationValue: number,
    landmarks: string[],

    // To be developed
    events?: object[],
    people?: number[],
    items?: number[]
}
