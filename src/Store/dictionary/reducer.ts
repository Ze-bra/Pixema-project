import { PossibleValueDto } from "@openmoviedb/kinopoiskdev_client"
import { DictionaryActionName } from "./actions"
import { DictionariesActionType, DictionariesType } from "../../Type/DictionariesTypes"

const initialValue: DictionariesType = {    
    genres: [] as PossibleValueDto[],
    contries: [] as PossibleValueDto[],
}

export const DictionaryReducer = (state: DictionariesType = initialValue, action: DictionariesActionType): DictionariesType => {
    switch (action.type) {
        case DictionaryActionName.LOAD_CONTRIES:
            return {
                ...state,
                contries: (action.payload as PossibleValueDto[]),
            }
        case DictionaryActionName.LOAD_GENRES:
            return {
                ...state,
                genres: (action.payload as PossibleValueDto[]),
            }
        
        default:
            return state
    }
}