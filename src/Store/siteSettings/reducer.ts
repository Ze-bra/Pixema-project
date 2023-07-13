import { AllFields, MovieDocsResponseDtoV13, MovieFields, PossibleValueDto } from "@openmoviedb/kinopoiskdev_client"
import { FilmListConstants } from "../../Constants/FilmListConstants"
export const SiteSettingsActionName = {

    SAVE_THEME: "SAVE_THEME"
} as const


export type SiteSettingsType = {

    theme: string
}



const initialValue: SiteSettingsType = {
    theme: "dark"
}

export type SiteSettingsActionType = {
    type: string;
    payload?: any
}

export const SiteSettingsReducer = (state: SiteSettingsType = initialValue, action: SiteSettingsActionType): SiteSettingsType => {
    switch (action.type) {

        case SiteSettingsActionName.SAVE_THEME:
            return {
                ...state,
                theme: (action.payload as string),
            }


        default:
            return state
    }
}