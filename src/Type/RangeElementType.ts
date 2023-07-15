export type RangeElementType = {
    value: [number, number],
    min: number,
    max: number,
    step: number,
    roundeCount: number,
    onChange: (values: [number, number]) => void
}