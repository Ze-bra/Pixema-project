import { SiteSettingsActionType, SiteSettingsType } from "../../Type/SiteSettingsTypes"
import { SiteSettingsActionName } from "./actions";

const initialValue: SiteSettingsType = {
    theme: "dark"
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