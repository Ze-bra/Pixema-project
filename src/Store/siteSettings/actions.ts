import { AppThunk } from ".."

export const SiteSettingsActionName = {
    SAVE_THEME: "SAVE_THEME"
} as const

export const saveThemeAction = (theme: string): AppThunk => {
    return (dispatch) => {
        dispatch({
            type: SiteSettingsActionName.SAVE_THEME,
            payload: theme
        })
    }
}

