export interface Place {
    id: number,
    scene: string,
    description: string,
    blurb?: string,
    routes?: number[],
    events?: object[],
    people?: number[]
}
