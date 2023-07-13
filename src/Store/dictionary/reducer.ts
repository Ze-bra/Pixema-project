import { AllFields, MovieDocsResponseDtoV13, MovieFields, PossibleValueDto } from "@openmoviedb/kinopoiskdev_client"
import { FilmListConstants } from "../../Constants/FilmListConstants"
export const DictionaryActionName = {
   
    LOAD_GENRES: "LOAD_GENRES",
    LOAD_CONTRIES: "LOAD_CONTRIES",
} as const


export type DictionariesType = {
   
    genres: PossibleValueDto[]
    contries: PossibleValueDto[],
}



const initialValue: DictionariesType = {    
    genres: [] as PossibleValueDto[],
    contries: [] as PossibleValueDto[],
}

export type DictionariesActionType = {
    type: string;
    payload?: any
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