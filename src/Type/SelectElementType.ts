import { ActionMeta, MultiValue } from "react-select"
import { SelectOptionType } from "./SelectOptionType"

export type SelectElementType = {
    options: SelectOptionType[],
    value: SelectOptionType[],
    onChange: (
        newValue: MultiValue<SelectOptionType>,
        actionMeta: ActionMeta<SelectOptionType>
    ) => void
}