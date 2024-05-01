export interface Location {

    //Required for UI
    name: string,
    description: string,

    //Required for MapGeneratorService
    previousLocation: Location | null,
    isFinalLocation: boolean,
    routes: Location[],
    deviationValue: number,

    //In development
    blurb?: string,
    events?: object[],
    people?: number[],
    items?: number[]

}
